"""
Template schemas - UZI shablon konfiguratsiyalari uchun Pydantic schemalar
"""
from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class TemplateFieldOption(BaseModel):
    """Shablon maydoni uchun tanlov varianti"""
    value: str
    label: str
    label_ru: str | None = None


class TemplateField(BaseModel):
    """Shablon maydoni konfiguratsiyasi"""
    name: str = Field(..., description="Maydon nomi (kalit)")
    label: str = Field(..., description="Maydon yorlig'i")
    label_ru: str | None = Field(None, description="Rus tilidagi yorliq")
    type: str = Field(..., description="Maydon turi: text, number, select, date, textarea")
    unit: str | None = Field(None, description="O'lchov birligi: мм, см, мл, уд/мин")
    required: bool = Field(False, description="Majburiy maydon")
    
    # Normal qiymatlar (faqat number turi uchun)
    normal_min: float | None = Field(None, description="Minimal normal qiymat")
    normal_max: float | None = Field(None, description="Maksimal normal qiymat")
    
    # Select turi uchun variantlar
    options: list[TemplateFieldOption] | None = None
    
    # Gruppalash uchun
    group: str | None = Field(None, description="Maydonlar guruhi")
    
    # Placeholder
    placeholder: str | None = None


class TemplateFieldGroup(BaseModel):
    """Maydonlar guruhi"""
    name: str
    label: str
    label_ru: str | None = None
    fields: list[TemplateField]


class ConclusionTemplate(BaseModel):
    """Tayyor xulosa shabloni"""
    code: str
    text: str
    text_ru: str


class TemplateBase(BaseModel):
    """Shablon asosiy ma'lumotlari"""
    code: str = Field(..., description="Shablon kodi")
    name: str = Field(..., description="Shablon nomi")
    name_ru: str = Field(..., description="Rus tilidagi nomi")
    category: str = Field(..., description="Kategoriya")
    fields: dict[str, Any] = Field(default_factory=dict, description="Maydonlar konfiguratsiyasi")
    conclusion_templates: dict[str, Any] = Field(default_factory=dict)
    recommendation_templates: dict[str, Any] = Field(default_factory=dict)
    print_template: str | None = None
    is_active: bool = True
    sort_order: int = 0


class TemplateCreate(TemplateBase):
    """Yangi shablon yaratish"""
    pass


class TemplateUpdate(BaseModel):
    """Shablon yangilash"""
    name: str | None = None
    name_ru: str | None = None
    fields: dict[str, Any] | None = None
    conclusion_templates: dict[str, Any] | None = None
    recommendation_templates: dict[str, Any] | None = None
    print_template: str | None = None
    is_active: bool | None = None
    sort_order: int | None = None


class TemplateRead(TemplateBase):
    """Shablon o'qish"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: datetime | None = None


class TemplateList(BaseModel):
    """Shablonlar ro'yxati"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    code: str
    name: str
    name_ru: str
    category: str
    is_active: bool
    sort_order: int


# ============================================================================
# Kategoriyalar va shablon turlari
# ============================================================================

TEMPLATE_CATEGORIES = {
    "gynecology": {
        "name": "Ginekologiya",
        "name_ru": "Гинекология",
        "icon": "female"
    },
    "obstetrics": {
        "name": "Akusherlik",
        "name_ru": "Акушерство", 
        "icon": "baby"
    },
    "abdominal": {
        "name": "Qorin bo'shlig'i",
        "name_ru": "Брюшная полость",
        "icon": "stomach"
    },
    "breast": {
        "name": "Sut bezlari",
        "name_ru": "Молочные железы",
        "icon": "breast"
    },
    "thyroid": {
        "name": "Qalqonsimon bez",
        "name_ru": "Щитовидная железа",
        "icon": "thyroid"
    },
    "vascular": {
        "name": "Tomirlar",
        "name_ru": "Сосуды",
        "icon": "heart"
    }
}

TEMPLATE_TYPES = {
    "abdominal": {
        "name": "Qorin bo'shlig'i",
        "name_ru": "Брюшное",
        "category": "abdominal"
    },
    "gynecology_uterus": {
        "name": "Bachadon",
        "name_ru": "Матка",
        "category": "gynecology"
    },
    "gynecology_cyst": {
        "name": "Tuxumdon kistasi",
        "name_ru": "Киста яичников",
        "category": "gynecology"
    },
    "gynecology_myoma": {
        "name": "Mioma",
        "name_ru": "Миома",
        "category": "gynecology"
    },
    "breast": {
        "name": "Sut bezlari",
        "name_ru": "Молочные железы",
        "category": "breast"
    },
    "thyroid": {
        "name": "Qalqonsimon bez",
        "name_ru": "Щитовидная железа",
        "category": "thyroid"
    },
    "thyroid_child": {
        "name": "Bolalar qalqonsimon bezi",
        "name_ru": "Детская ЩЖ",
        "category": "thyroid"
    },
    "obstetrics_1": {
        "name": "1-trimestr skrining",
        "name_ru": "I триместр скрининг",
        "category": "obstetrics"
    },
    "obstetrics_2": {
        "name": "2-trimestr skrining",
        "name_ru": "II триместр скрининг",
        "category": "obstetrics"
    },
    "obstetrics_3": {
        "name": "3-trimestr skrining",
        "name_ru": "III триместр скрининг",
        "category": "obstetrics"
    },
    "obstetrics_multi": {
        "name": "Ko'p homilali",
        "name_ru": "Многоплодная",
        "category": "obstetrics"
    },
    "doppler": {
        "name": "Homila doppleri",
        "name_ru": "Допплер плода",
        "category": "obstetrics"
    }
}
