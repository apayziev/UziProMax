"""
Template model - UZI shablon konfiguratsiyalari
"""
from sqlalchemy import Boolean, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from .base import BaseModel


class Template(BaseModel):
    """
    Shablon modeli - Template model for storing UZI template configurations
    
    Har bir shablon turi uchun:
    - Maydonlar ro'yxati (fields)
    - Normal qiymatlar (normal_ranges)
    - Shablon matni
    """
    __tablename__ = "template"

    # Shablon identifikatori
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, kw_only=True)  # e.g., "abdominal"
    name: Mapped[str] = mapped_column(String(100), kw_only=True)  # e.g., "Qorin bo'shlig'i UZI"
    name_ru: Mapped[str] = mapped_column(String(100), kw_only=True)  # e.g., "Брюшное"
    
    # Kategoriya
    category: Mapped[str] = mapped_column(String(50), index=True, kw_only=True)
    # Kategoriyalar: gynecology, obstetrics, abdominal, breast, thyroid, vascular
    
    # Shablon konfiguratsiyasi
    # fields: Maydonlar ro'yxati - JSON formatida
    # [
    #   {"name": "liver_length", "label": "Длина печени", "type": "number", "unit": "мм", "normal_min": 100, "normal_max": 150},
    #   {"name": "liver_contour", "label": "Контуры", "type": "select", "options": ["ровные", "неровные"]},
    # ]
    fields: Mapped[dict] = mapped_column(JSONB, default=dict, kw_only=True)
    
    # Xulosa shablonlari - JSONB formatida
    # conclusion_templates: Tayyor xulosa variantlari
    conclusion_templates: Mapped[dict] = mapped_column(JSONB, default=dict, kw_only=True)
    
    # Tavsiya shablonlari
    recommendation_templates: Mapped[dict] = mapped_column(JSONB, default=dict, kw_only=True)
    
    # Chop etish shabloni (Word/HTML format)
    print_template: Mapped[str | None] = mapped_column(Text, nullable=True, kw_only=True)
    
    # Faollik holati
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, kw_only=True)
    
    # Tartib raqami (UI da ko'rsatish uchun)
    sort_order: Mapped[int] = mapped_column(default=0, kw_only=True)
