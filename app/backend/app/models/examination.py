"""
Examination model - UZI tekshiruv ma'lumotlari
"""
from datetime import date, datetime
from typing import TYPE_CHECKING

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel

if TYPE_CHECKING:
    from .patient import Patient
    from .user import User


class Examination(BaseModel):
    """
    Tekshiruv modeli - Examination model for storing UZI examination data
    
    Shablon turlari (template_type):
    - abdominal: Qorin bo'shlig'i (Брюшное)
    - gynecology_uterus: Bachadon (Матка)
    - gynecology_cyst: Tuxumdon kistasi (Киста яичников)
    - gynecology_myoma: Mioma (Миома)
    - breast: Sut bezlari (МЖ)
    - thyroid: Qalqonsimon bez (ЩЖ)
    - thyroid_child: Bolalar qalqonsimon bezi (детский ЩЖ)
    - obstetrics_1: 1-trimestr skrining
    - obstetrics_2: 2-trimestr skrining
    - obstetrics_3: 3-trimestr skrining
    - obstetrics_multi: Ko'p homilali
    - doppler: Homila doppleri
    """
    __tablename__ = "examination"

    # Foreign keys
    patient_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("patient.id", ondelete="CASCADE"), 
        index=True,
        kw_only=True
    )
    doctor_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("user.id"), 
        index=True,
        kw_only=True
    )

    # Tekshiruv ma'lumotlari - Examination info
    examination_date: Mapped[date] = mapped_column(Date, index=True, kw_only=True)  # Tekshiruv sanasi
    template_type: Mapped[str] = mapped_column(String(50), index=True, kw_only=True)  # Shablon turi
    
    # Dinamik ma'lumotlar - JSONB formatida barcha o'lchovlar va natijalar
    # Bu yerda har bir shablon turi uchun turli xil ma'lumotlar saqlanadi
    examination_data: Mapped[dict] = mapped_column(JSONB, default=dict, kw_only=True)
    
    # Xulosa va tavsiyalar - Conclusion
    conclusion: Mapped[str | None] = mapped_column(Text, nullable=True, kw_only=True)  # ЗАКЛЮЧЕНИЕ
    recommendations: Mapped[str | None] = mapped_column(Text, nullable=True, kw_only=True)  # РЕКОМЕНДАЦИИ
    
    # Qo'shimcha ma'lumotlar
    notes: Mapped[str | None] = mapped_column(Text, nullable=True, kw_only=True)  # Ichki izohlar
    
    # Holat - Status
    status: Mapped[str] = mapped_column(
        String(20), 
        default="draft",  # draft, completed, printed
        kw_only=True
    )

    # Relationships
    patient: Mapped["Patient"] = relationship("Patient", back_populates="examinations", init=False)
    doctor: Mapped["User"] = relationship("User", init=False)
