"""
Examination API routes - UZI tekshiruvlar uchun API endpointlar
"""
from datetime import date
from fastapi import APIRouter, HTTPException, Query
from typing import Any

from app.api.deps import CurrentUser, SessionDep
from app.crud import crud_examination, crud_patient
from app.schemas.examination import (
    ExaminationCreate,
    ExaminationUpdate,
    ExaminationRead,
    ExaminationList,
)
from app.schemas.common import Message
from app.schemas.template import TEMPLATE_TYPES

router = APIRouter()


@router.get("", response_model=dict[str, Any])
async def get_examinations(
    db: SessionDep,
    current_user: CurrentUser,
    patient_id: int | None = Query(None, description="Bemor ID"),
    template_type: str | None = Query(None, description="Shablon turi"),
    date_from: date | None = Query(None, description="Boshlanish sanasi"),
    date_to: date | None = Query(None, description="Tugash sanasi"),
    status: str | None = Query(None, pattern="^(draft|completed|printed)$"),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
) -> Any:
    """
    Tekshiruvlar ro'yxatini olish
    
    - **patient_id**: Bemor bo'yicha filter
    - **template_type**: Shablon turi bo'yicha filter
    - **date_from/date_to**: Sana oralig'i
    - **status**: Holat (draft, completed, printed)
    """
    examinations, total = await crud_examination.search(
        db=db,
        patient_id=patient_id,
        template_type=template_type,
        date_from=date_from,
        date_to=date_to,
        status=status,
        page=page,
        per_page=per_page
    )
    
    items = []
    for exam in examinations:
        item = ExaminationList.model_validate(exam)
        if exam.patient:
            patient_name = f"{exam.patient.last_name} {exam.patient.first_name}"
            if exam.patient.middle_name:
                patient_name += f" {exam.patient.middle_name}"
            item.patient_name = patient_name
            item.patient_phone = exam.patient.phone
            item.patient_birth_date = exam.patient.birth_date
        else:
            item.patient_name = None
            item.patient_phone = None
            item.patient_birth_date = None
        item.template_name = TEMPLATE_TYPES.get(exam.template_type, {}).get("name_ru", exam.template_type)
        items.append(item)
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "per_page": per_page,
        "pages": (total + per_page - 1) // per_page
    }


@router.post("", response_model=ExaminationRead)
async def create_examination(
    db: SessionDep,
    current_user: CurrentUser,
    examination_in: ExaminationCreate,
) -> Any:
    """
    Yangi tekshiruv yaratish
    """
    # Check if patient exists
    patient = await crud_patient.get_by_id(db, examination_in.patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Bemor topilmadi")
    
    # Validate template type
    if examination_in.template_type not in TEMPLATE_TYPES:
        raise HTTPException(status_code=400, detail="Noto'g'ri shablon turi")
    
    examination = await crud_examination.create(
        db=db,
        examination_in=examination_in,
        doctor_id=current_user.id
    )
    
    result = ExaminationRead.model_validate(examination)
    patient_name = f"{patient.last_name} {patient.first_name}"
    if patient.middle_name:
        patient_name += f" {patient.middle_name}"
    result.patient_name = patient_name
    doctor_name = f"{current_user.first_name} {current_user.last_name}"
    result.doctor_name = doctor_name
    result.template_name = TEMPLATE_TYPES.get(examination.template_type, {}).get("name_ru")
    
    return result


@router.get("/recent", response_model=list[ExaminationList])
async def get_recent_examinations(
    db: SessionDep,
    current_user: CurrentUser,
    limit: int = Query(10, ge=1, le=50),
) -> Any:
    """
    Oxirgi tekshiruvlar
    """
    examinations = await crud_examination.get_recent(db=db, limit=limit)
    
    items = []
    for exam in examinations:
        item = ExaminationList.model_validate(exam)
        if exam.patient:
            item.patient_name = f"{exam.patient.last_name} {exam.patient.first_name}"
            if exam.patient.middle_name:
                item.patient_name += f" {exam.patient.middle_name}"
        else:
            item.patient_name = None
        item.template_name = TEMPLATE_TYPES.get(exam.template_type, {}).get("name_ru", exam.template_type)
        items.append(item)
    
    return items


@router.get("/statistics", response_model=dict[str, Any])
async def get_statistics(
    db: SessionDep,
    current_user: CurrentUser,
    date_from: date | None = Query(None),
    date_to: date | None = Query(None),
) -> Any:
    """
    Tekshiruvlar statistikasi
    """
    stats = await crud_examination.get_statistics(
        db=db,
        date_from=date_from,
        date_to=date_to
    )
    
    # Add today's count
    today_count = await crud_examination.get_today_count(db=db)
    stats["today"] = today_count
    
    return stats


@router.get("/templates", response_model=dict[str, Any])
async def get_template_types(
    current_user: CurrentUser,
) -> Any:
    """
    Mavjud shablon turlarini olish
    """
    return {
        "templates": TEMPLATE_TYPES
    }


@router.get("/{examination_id}", response_model=ExaminationRead)
async def get_examination(
    db: SessionDep,
    current_user: CurrentUser,
    examination_id: int,
) -> Any:
    """
    ID bo'yicha tekshiruv olish
    """
    examination = await crud_examination.get_by_id(db=db, examination_id=examination_id)
    if not examination:
        raise HTTPException(status_code=404, detail="Tekshiruv topilmadi")
    
    result = ExaminationRead.model_validate(examination)
    if examination.patient:
        patient_name = f"{examination.patient.last_name} {examination.patient.first_name}"
        if examination.patient.middle_name:
            patient_name += f" {examination.patient.middle_name}"
        result.patient_name = patient_name
    else:
        result.patient_name = None
    if examination.doctor:
        result.doctor_name = f"{examination.doctor.first_name} {examination.doctor.last_name}"
    else:
        result.doctor_name = None
    result.template_name = TEMPLATE_TYPES.get(examination.template_type, {}).get("name_ru")
    
    return result


@router.put("/{examination_id}", response_model=ExaminationRead)
async def update_examination(
    db: SessionDep,
    current_user: CurrentUser,
    examination_id: int,
    examination_in: ExaminationUpdate,
) -> Any:
    """
    Tekshiruv ma'lumotlarini yangilash
    """
    examination = await crud_examination.get_by_id(db=db, examination_id=examination_id)
    if not examination:
        raise HTTPException(status_code=404, detail="Tekshiruv topilmadi")
    
    examination = await crud_examination.update(
        db=db,
        examination=examination,
        examination_in=examination_in
    )
    
    result = ExaminationRead.model_validate(examination)
    if examination.patient:
        patient_name = f"{examination.patient.last_name} {examination.patient.first_name}"
        if examination.patient.middle_name:
            patient_name += f" {examination.patient.middle_name}"
        result.patient_name = patient_name
    else:
        result.patient_name = None
    if examination.doctor:
        result.doctor_name = f"{examination.doctor.first_name} {examination.doctor.last_name}"
    else:
        result.doctor_name = None
    result.template_name = TEMPLATE_TYPES.get(examination.template_type, {}).get("name_ru")
    
    return result


@router.patch("/{examination_id}/status")
async def update_examination_status(
    db: SessionDep,
    current_user: CurrentUser,
    examination_id: int,
    status: str = Query(..., pattern="^(draft|completed|printed)$"),
) -> Any:
    """
    Tekshiruv holatini yangilash
    """
    examination = await crud_examination.update_status(
        db=db,
        examination_id=examination_id,
        status=status
    )
    if not examination:
        raise HTTPException(status_code=404, detail="Tekshiruv topilmadi")
    
    return {"message": "Holat yangilandi", "status": status}


@router.delete("/{examination_id}", response_model=Message)
async def delete_examination(
    db: SessionDep,
    current_user: CurrentUser,
    examination_id: int,
) -> Any:
    """
    Tekshiruvni o'chirish (soft delete)
    """
    examination = await crud_examination.get_by_id(db=db, examination_id=examination_id)
    if not examination:
        raise HTTPException(status_code=404, detail="Tekshiruv topilmadi")
    
    await crud_examination.delete(db=db, id=examination.id)
    return Message(message="Tekshiruv muvaffaqiyatli o'chirildi")


@router.get("/{examination_id}/print", response_model=dict[str, Any])
async def get_examination_for_print(
    db: SessionDep,
    current_user: CurrentUser,
    examination_id: int,
) -> Any:
    """
    Chop etish uchun tekshiruv ma'lumotlarini olish
    """
    examination = await crud_examination.get_by_id(db=db, examination_id=examination_id)
    if not examination:
        raise HTTPException(status_code=404, detail="Tekshiruv topilmadi")
    
    # Update status to printed
    await crud_examination.update_status(db=db, examination_id=examination_id, status="printed")
    
    patient = examination.patient
    patient_name = f"{patient.last_name} {patient.first_name}"
    if patient.middle_name:
        patient_name += f" {patient.middle_name}"
    
    return {
        "examination": ExaminationRead.model_validate(examination),
        "patient": {
            "last_name": patient.last_name,
            "first_name": patient.first_name,
            "middle_name": patient.middle_name,
            "name": patient_name,
            "birth_date": patient.birth_date,
            "gender": patient.gender,
            "phone": patient.phone,
        },
        "doctor": {
            "name": f"{examination.doctor.first_name} {examination.doctor.last_name}" if examination.doctor else examination.doctor.username,
        },
        "template": TEMPLATE_TYPES.get(examination.template_type, {}),
    }
