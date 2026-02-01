"""
Patient API routes - Bemorlar uchun API endpointlar
"""
from fastapi import APIRouter, HTTPException, Query
from typing import Any

from app.api.deps import CurrentUser, SessionDep
from app.crud import crud_patient
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientRead,
    PatientList,
)
from app.schemas.common import Message

router = APIRouter()


@router.get("", response_model=dict[str, Any])
async def get_patients(
    db: SessionDep,
    current_user: CurrentUser,
    query: str | None = Query(None, description="Qidiruv so'zi"),
    gender: str | None = Query(None, pattern="^(male|female)$"),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
) -> Any:
    """
    Bemorlar ro'yxatini olish
    
    - **query**: Ism yoki telefon bo'yicha qidirish
    - **gender**: Jins bo'yicha filter (male/female)
    - **page**: Sahifa raqami
    - **per_page**: Har sahifada nechta
    """
    patients, total = await crud_patient.search(
        db=db,
        query=query,
        gender=gender,
        page=page,
        per_page=per_page
    )
    
    return {
        "items": [PatientList.model_validate(p) for p in patients],
        "total": total,
        "page": page,
        "per_page": per_page,
        "pages": (total + per_page - 1) // per_page
    }


@router.post("", response_model=PatientRead)
async def create_patient(
    db: SessionDep,
    current_user: CurrentUser,
    patient_in: PatientCreate,
) -> Any:
    """
    Yangi bemor yaratish
    """
    # Check if patient with same phone exists
    if patient_in.phone:
        existing = await crud_patient.get_by_phone(db, patient_in.phone)
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Bu telefon raqami bilan bemor mavjud"
            )
    
    patient = await crud_patient.create(db=db, patient_in=patient_in)
    return PatientRead.model_validate(patient)


@router.get("/recent", response_model=list[PatientList])
async def get_recent_patients(
    db: SessionDep,
    current_user: CurrentUser,
    limit: int = Query(10, ge=1, le=50),
) -> Any:
    """
    Oxirgi qo'shilgan bemorlar
    """
    patients = await crud_patient.get_recent(db=db, limit=limit)
    return [PatientList.model_validate(p) for p in patients]


@router.get("/{patient_id}", response_model=PatientRead)
async def get_patient(
    db: SessionDep,
    current_user: CurrentUser,
    patient_id: int,
) -> Any:
    """
    ID bo'yicha bemor olish
    """
    patient = await crud_patient.get_by_id(db=db, patient_id=patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Bemor topilmadi")
    
    # Get examination count
    result = await crud_patient.get_with_examination_count(db, patient_id)
    patient_data = PatientRead.model_validate(patient)
    if result:
        patient_data.examination_count = result["examination_count"]
    
    return patient_data


@router.put("/{patient_id}", response_model=PatientRead)
async def update_patient(
    db: SessionDep,
    current_user: CurrentUser,
    patient_id: int,
    patient_in: PatientUpdate,
) -> Any:
    """
    Bemor ma'lumotlarini yangilash
    """
    patient = await crud_patient.get_by_id(db=db, patient_id=patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Bemor topilmadi")
    
    # Check phone uniqueness
    if patient_in.phone and patient_in.phone != patient.phone:
        existing = await crud_patient.get_by_phone(db, patient_in.phone)
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Bu telefon raqami bilan boshqa bemor mavjud"
            )
    
    patient = await crud_patient.update(db=db, patient=patient, patient_in=patient_in)
    return PatientRead.model_validate(patient)


@router.delete("/{patient_id}", response_model=Message)
async def delete_patient(
    db: SessionDep,
    current_user: CurrentUser,
    patient_id: int,
) -> Any:
    """
    Bemorni o'chirish (soft delete)
    """
    patient = await crud_patient.get_by_id(db=db, patient_id=patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Bemor topilmadi")
    
    await crud_patient.delete(db=db, id=patient.id)
    return Message(message="Bemor muvaffaqiyatli o'chirildi")
