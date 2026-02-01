"""
Patient model - Bemor ma'lumotlari
"""
from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Date, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel

if TYPE_CHECKING:
    from .examination import Examination


class Patient(BaseModel):
    """Bemor modeli - Patient model for storing patient information"""
    __tablename__ = "patient"

    # Shaxsiy ma'lumotlar - Personal information
    full_name: Mapped[str] = mapped_column(String(100), index=True, kw_only=True)  # ФИО
    birth_date: Mapped[date | None] = mapped_column(Date, nullable=True, kw_only=True)  # Tug'ilgan sana
    gender: Mapped[str] = mapped_column(String(10), kw_only=True)  # Jins: male/female
    
    # Aloqa ma'lumotlari - Contact information
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True, kw_only=True)  # Telefon
    address: Mapped[str | None] = mapped_column(Text, nullable=True, kw_only=True)  # Manzil
    
    # Qo'shimcha ma'lumotlar - Additional info
    notes: Mapped[str | None] = mapped_column(Text, nullable=True, kw_only=True)  # Izohlar

    # Relationships
    examinations: Mapped[list["Examination"]] = relationship(
        "Examination", 
        back_populates="patient", 
        cascade="all, delete-orphan", 
        init=False
    )
