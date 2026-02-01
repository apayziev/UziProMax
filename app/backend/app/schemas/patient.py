"""
Patient schemas - Bemor ma'lumotlari uchun Pydantic schemalar
"""
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class PatientBase(BaseModel):
    """Bemor asosiy ma'lumotlari"""
    full_name: str = Field(..., min_length=2, max_length=100, description="ФИО / To'liq ism")
    birth_date: date | None = Field(None, description="Tug'ilgan sana")
    gender: str = Field(..., pattern="^(male|female)$", description="Jins: male/female")
    phone: str | None = Field(None, max_length=20, description="Telefon raqami")
    address: str | None = Field(None, description="Manzil")
    notes: str | None = Field(None, description="Izohlar")


class PatientCreate(PatientBase):
    """Yangi bemor yaratish"""
    pass


class PatientUpdate(BaseModel):
    """Bemor ma'lumotlarini yangilash"""
    full_name: str | None = Field(None, min_length=2, max_length=100)
    birth_date: date | None = None
    gender: str | None = Field(None, pattern="^(male|female)$")
    phone: str | None = None
    address: str | None = None
    notes: str | None = None


class PatientRead(PatientBase):
    """Bemor ma'lumotlarini o'qish"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: datetime | None = None
    
    # Computed fields
    examination_count: int = 0


class PatientList(BaseModel):
    """Bemorlar ro'yxati"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    full_name: str
    birth_date: date | None = None
    gender: str
    phone: str | None = None
    created_at: datetime
    examination_count: int = 0


class PatientSearch(BaseModel):
    """Bemor qidirish parametrlari"""
    query: str | None = Field(None, description="Qidiruv so'zi (ism, telefon)")
    gender: str | None = Field(None, pattern="^(male|female)$")
    page: int = Field(1, ge=1)
    per_page: int = Field(20, ge=1, le=100)
