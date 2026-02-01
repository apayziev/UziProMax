"""
Examination CRUD operations - UZI tekshiruv ma'lumotlari uchun CRUD operatsiyalari
"""
from collections.abc import Sequence
from datetime import date
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.examination import Examination
from app.models.patient import Patient
from app.models.user import User
from app.schemas.examination import ExaminationCreate, ExaminationUpdate

from .base import BaseCRUD


class CRUDExamination(BaseCRUD[Examination]):
    """CRUD operatsiyalari - Examination model uchun"""

    async def create(
        self,
        db: AsyncSession,
        examination_in: ExaminationCreate,
        doctor_id: int
    ) -> Examination:
        """Yangi tekshiruv yaratish"""
        examination = Examination(
            **examination_in.model_dump(),
            doctor_id=doctor_id
        )
        db.add(examination)
        await db.commit()
        await db.refresh(examination)
        return examination

    async def update(
        self,
        db: AsyncSession,
        examination: Examination,
        examination_in: ExaminationUpdate
    ) -> Examination:
        """Tekshiruv ma'lumotlarini yangilash"""
        update_data = examination_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(examination, field, value)
        await db.commit()
        await db.refresh(examination)
        return examination

    async def get_by_id(
        self,
        db: AsyncSession,
        examination_id: int,
        include_relations: bool = True
    ) -> Examination | None:
        """ID bo'yicha tekshiruv olish"""
        query = select(Examination).where(
            Examination.id == examination_id,
            Examination.is_deleted == False
        )
        if include_relations:
            query = query.options(
                selectinload(Examination.patient),
                selectinload(Examination.doctor)
            )
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def get_by_patient(
        self,
        db: AsyncSession,
        patient_id: int,
        page: int = 1,
        per_page: int = 20
    ) -> tuple[Sequence[Examination], int]:
        """Bemor bo'yicha tekshiruvlar"""
        # Base query
        stmt = select(Examination).where(
            Examination.patient_id == patient_id,
            Examination.is_deleted == False
        )
        count_stmt = select(func.count(Examination.id)).where(
            Examination.patient_id == patient_id,
            Examination.is_deleted == False
        )

        # Get total count
        total_result = await db.execute(count_stmt)
        total = total_result.scalar() or 0

        # Pagination and ordering
        stmt = stmt.order_by(Examination.examination_date.desc())
        stmt = stmt.offset((page - 1) * per_page).limit(per_page)

        result = await db.execute(stmt)
        examinations = result.scalars().all()

        return examinations, total

    async def search(
        self,
        db: AsyncSession,
        patient_id: int | None = None,
        template_type: str | None = None,
        date_from: date | None = None,
        date_to: date | None = None,
        status: str | None = None,
        page: int = 1,
        per_page: int = 20
    ) -> tuple[Sequence[Examination], int]:
        """
        Tekshiruvlarni qidirish
        
        Returns:
            tuple: (tekshiruvlar ro'yxati, umumiy soni)
        """
        # Base query
        stmt = select(Examination).where(Examination.is_deleted == False)
        count_stmt = select(func.count(Examination.id)).where(Examination.is_deleted == False)

        # Filters
        if patient_id:
            stmt = stmt.where(Examination.patient_id == patient_id)
            count_stmt = count_stmt.where(Examination.patient_id == patient_id)

        if template_type:
            stmt = stmt.where(Examination.template_type == template_type)
            count_stmt = count_stmt.where(Examination.template_type == template_type)

        if date_from:
            stmt = stmt.where(Examination.examination_date >= date_from)
            count_stmt = count_stmt.where(Examination.examination_date >= date_from)

        if date_to:
            stmt = stmt.where(Examination.examination_date <= date_to)
            count_stmt = count_stmt.where(Examination.examination_date <= date_to)

        if status:
            stmt = stmt.where(Examination.status == status)
            count_stmt = count_stmt.where(Examination.status == status)

        # Get total count
        total_result = await db.execute(count_stmt)
        total = total_result.scalar() or 0

        # Pagination and ordering
        stmt = stmt.options(selectinload(Examination.patient))
        stmt = stmt.order_by(Examination.examination_date.desc(), Examination.created_at.desc())
        stmt = stmt.offset((page - 1) * per_page).limit(per_page)

        result = await db.execute(stmt)
        examinations = result.scalars().all()

        return examinations, total

    async def get_recent(
        self,
        db: AsyncSession,
        limit: int = 10
    ) -> Sequence[Examination]:
        """Oxirgi tekshiruvlar"""
        result = await db.execute(
            select(Examination)
            .options(selectinload(Examination.patient))
            .where(Examination.is_deleted == False)
            .order_by(Examination.created_at.desc())
            .limit(limit)
        )
        return result.scalars().all()

    async def get_today_count(
        self,
        db: AsyncSession,
        doctor_id: int | None = None
    ) -> int:
        """Bugungi tekshiruvlar soni"""
        from datetime import date as date_type
        today = date_type.today()
        
        stmt = select(func.count(Examination.id)).where(
            Examination.examination_date == today,
            Examination.is_deleted == False
        )
        if doctor_id:
            stmt = stmt.where(Examination.doctor_id == doctor_id)
        
        result = await db.execute(stmt)
        return result.scalar() or 0

    async def get_statistics(
        self,
        db: AsyncSession,
        date_from: date | None = None,
        date_to: date | None = None
    ) -> dict[str, Any]:
        """Statistika"""
        # Base filter
        base_filter = [Examination.is_deleted == False]
        if date_from:
            base_filter.append(Examination.examination_date >= date_from)
        if date_to:
            base_filter.append(Examination.examination_date <= date_to)

        # Total examinations
        total_result = await db.execute(
            select(func.count(Examination.id)).where(*base_filter)
        )
        total = total_result.scalar() or 0

        # By template type
        by_type_result = await db.execute(
            select(
                Examination.template_type,
                func.count(Examination.id).label("count")
            )
            .where(*base_filter)
            .group_by(Examination.template_type)
        )
        by_type = {row[0]: row[1] for row in by_type_result.all()}

        # By status
        by_status_result = await db.execute(
            select(
                Examination.status,
                func.count(Examination.id).label("count")
            )
            .where(*base_filter)
            .group_by(Examination.status)
        )
        by_status = {row[0]: row[1] for row in by_status_result.all()}

        return {
            "total": total,
            "by_template_type": by_type,
            "by_status": by_status
        }

    async def update_status(
        self,
        db: AsyncSession,
        examination_id: int,
        status: str
    ) -> Examination | None:
        """Tekshiruv holatini yangilash"""
        examination = await self.get_by_id(db, examination_id, include_relations=False)
        if examination:
            examination.status = status
            await db.commit()
            await db.refresh(examination)
        return examination


# Singleton instance
crud_examination = CRUDExamination(Examination)
