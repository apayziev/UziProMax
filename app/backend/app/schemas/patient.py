"""
Patient schemas - Bemor ma'lumotlari uchun Pydantic schemalar
"""
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, computed_field


class PatientBase(BaseModel):
    """Bemor asosiy ma'lumotlari"""
    last_name: str = Field(..., min_length=1, max_length=50, description="Familiya")
    first_name: str = Field(..., min_length=1, max_length=50, description="Ism")
    middle_name: str | None = Field(None, max_length=50, description="Otasining ismi / Sharifi")
    birth_date: date | None = Field(None, description="Tug'ilgan sana")
    gender: str = Field(..., pattern="^(male|female)$", description="Jins: male/female")
    phone: str | None = Field(None, max_length=20, description="Telefon raqami")
    address: str | None = Field(None, description="Manzil")
    notes: str | None = Field(None, description="Izohlar")
    
    @computed_field
    @property
    def full_name(self) -> str:
        """Computed full name from parts"""
        parts = [self.last_name, self.first_name, self.middle_name]
        return " ".join(p for p in parts if p)


class PatientCreate(PatientBase):
    """Yangi bemor yaratish"""
    pass


class PatientUpdate(BaseModel):
    """Bemor ma'lumotlarini yangilash"""
    last_name: str | None = Field(None, min_length=1, max_length=50)
    first_name: str | None = Field(None, min_length=1, max_length=50)
    middle_name: str | None = Field(None, max_length=50)
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
    examination_count: int = 0


class PatientList(BaseModel):
    """Bemorlar ro'yxati"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    last_name: str
    first_name: str
    middle_name: str | None = None
    birth_date: date | None = None
    gender: str
    phone: str | None = None
    created_at: datetime
    examination_count: int = 0
    
    @computed_field
    @property
    def full_name(self) -> str:
        """Computed full name from parts"""
        parts = [self.last_name, self.first_name, self.middle_name]
        return " ".join(p for p in parts if p)


class PatientSearch(BaseModel):
    """Bemor qidirish parametrlari"""
    query: str | None = Field(None, description="Qidiruv so'zi (ism, telefon)")
    gender: str | None = Field(None, pattern="^(male|female)$")
    page: int = Field(1, ge=1)
    per_page: int = Field(20, ge=1, le=100)
