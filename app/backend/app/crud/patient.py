"""
Patient CRUD operations - Bemor ma'lumotlari uchun CRUD operatsiyalari
"""
from collections.abc import Sequence
from typing import Any

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.patient import Patient
from app.schemas.patient import PatientCreate, PatientUpdate

from .base import BaseCRUD


class CRUDPatient(BaseCRUD[Patient]):
    """CRUD operatsiyalari - Patient model uchun"""

    async def create(
        self, 
        db: AsyncSession, 
        patient_in: PatientCreate
    ) -> Patient:
        """Yangi bemor yaratish"""
        patient = Patient(**patient_in.model_dump())
        db.add(patient)
        await db.commit()
        await db.refresh(patient)
        return patient

    async def update(
        self,
        db: AsyncSession,
        patient: Patient,
        patient_in: PatientUpdate
    ) -> Patient:
        """Bemor ma'lumotlarini yangilash"""
        update_data = patient_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(patient, field, value)
        await db.commit()
        await db.refresh(patient)
        return patient

    async def get_by_id(
        self,
        db: AsyncSession,
        patient_id: int,
        include_examinations: bool = False
    ) -> Patient | None:
        """ID bo'yicha bemor olish"""
        query = select(Patient).where(
            Patient.id == patient_id,
            Patient.is_deleted == False
        )
        if include_examinations:
            query = query.options(selectinload(Patient.examinations))
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def get_by_phone(
        self,
        db: AsyncSession,
        phone: str
    ) -> Patient | None:
        """Telefon raqami bo'yicha bemor olish"""
        result = await db.execute(
            select(Patient).where(
                Patient.phone == phone,
                Patient.is_deleted == False
            )
        )
        return result.scalar_one_or_none()

    async def search(
        self,
        db: AsyncSession,
        query: str | None = None,
        gender: str | None = None,
        page: int = 1,
        per_page: int = 20
    ) -> tuple[Sequence[Patient], int]:
        """
        Bemorlarni qidirish
        
        Returns:
            tuple: (bemorlar ro'yxati, umumiy soni)
        """
        # Base query
        stmt = select(Patient).where(Patient.is_deleted == False)
        count_stmt = select(func.count(Patient.id)).where(Patient.is_deleted == False)

        # Search filter
        if query:
            search_filter = or_(
                Patient.full_name.ilike(f"%{query}%"),
                Patient.phone.ilike(f"%{query}%")
            )
            stmt = stmt.where(search_filter)
            count_stmt = count_stmt.where(search_filter)

        # Gender filter
        if gender:
            stmt = stmt.where(Patient.gender == gender)
            count_stmt = count_stmt.where(Patient.gender == gender)

        # Get total count
        total_result = await db.execute(count_stmt)
        total = total_result.scalar() or 0

        # Pagination and ordering
        stmt = stmt.order_by(Patient.created_at.desc())
        stmt = stmt.offset((page - 1) * per_page).limit(per_page)

        result = await db.execute(stmt)
        patients = result.scalars().all()

        return patients, total

    async def get_recent(
        self,
        db: AsyncSession,
        limit: int = 10
    ) -> Sequence[Patient]:
        """Oxirgi qo'shilgan bemorlar"""
        result = await db.execute(
            select(Patient)
            .where(Patient.is_deleted == False)
            .order_by(Patient.created_at.desc())
            .limit(limit)
        )
        return result.scalars().all()

    async def get_with_examination_count(
        self,
        db: AsyncSession,
        patient_id: int
    ) -> dict[str, Any] | None:
        """Bemor + tekshiruvlar soni"""
        from app.models.examination import Examination
        
        result = await db.execute(
            select(
                Patient,
                func.count(Examination.id).label("examination_count")
            )
            .outerjoin(Examination, Examination.patient_id == Patient.id)
            .where(Patient.id == patient_id, Patient.is_deleted == False)
            .group_by(Patient.id)
        )
        row = result.first()
        if row:
            patient, count = row
            return {
                "patient": patient,
                "examination_count": count
            }
        return None


# Singleton instance
crud_patient = CRUDPatient(Patient)
