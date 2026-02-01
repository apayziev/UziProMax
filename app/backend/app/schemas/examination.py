"""
Examination schemas - UZI tekshiruv ma'lumotlari uchun Pydantic schemalar
"""
from datetime import date, datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class ExaminationBase(BaseModel):
    """Tekshiruv asosiy ma'lumotlari"""
    patient_id: int = Field(..., description="Bemor ID")
    examination_date: date = Field(..., description="Tekshiruv sanasi")
    template_type: str = Field(..., description="Shablon turi")
    examination_data: dict[str, Any] = Field(default_factory=dict, description="Tekshiruv ma'lumotlari (JSONB)")
    conclusion: str | None = Field(None, description="Xulosa / ЗАКЛЮЧЕНИЕ")
    recommendations: str | None = Field(None, description="Tavsiyalar / РЕКОМЕНДАЦИИ")
    notes: str | None = Field(None, description="Ichki izohlar")
    status: str = Field("draft", pattern="^(draft|completed|printed)$", description="Holat")


class ExaminationCreate(ExaminationBase):
    """Yangi tekshiruv yaratish"""
    pass


class ExaminationUpdate(BaseModel):
    """Tekshiruv ma'lumotlarini yangilash"""
    examination_date: date | None = None
    examination_data: dict[str, Any] | None = None
    conclusion: str | None = None
    recommendations: str | None = None
    notes: str | None = None
    status: str | None = Field(None, pattern="^(draft|completed|printed)$")


class ExaminationRead(ExaminationBase):
    """Tekshiruv ma'lumotlarini o'qish"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    doctor_id: int
    created_at: datetime
    updated_at: datetime | None = None
    
    # Nested data
    patient_name: str | None = None
    doctor_name: str | None = None
    template_name: str | None = None


class ExaminationList(BaseModel):
    """Tekshiruvlar ro'yxati"""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    patient_id: int
    patient_name: str | None = None
    examination_date: date
    template_type: str
    template_name: str | None = None
    status: str
    created_at: datetime


class ExaminationSearch(BaseModel):
    """Tekshiruv qidirish parametrlari"""
    patient_id: int | None = Field(None, description="Bemor ID bo'yicha filter")
    template_type: str | None = Field(None, description="Shablon turi bo'yicha filter")
    date_from: date | None = Field(None, description="Sana boshlanishi")
    date_to: date | None = Field(None, description="Sana tugashi")
    status: str | None = Field(None, pattern="^(draft|completed|printed)$")
    page: int = Field(1, ge=1)
    per_page: int = Field(20, ge=1, le=100)


# ============================================================================
# Shablon turlari uchun ma'lumotlar strukturalari
# ============================================================================

class AbdominalExamData(BaseModel):
    """Qorin bo'shlig'i UZI ma'lumotlari - Брюшное"""
    # Jigar - Печень
    liver_kvr_right: float | None = Field(None, description="КВР правой доли, мм")
    liver_kvr_left: float | None = Field(None, description="КВР левой доли, мм")
    liver_kkr: float | None = Field(None, description="ККР, мм")
    liver_pzr: float | None = Field(None, description="ПЗР, мм")
    liver_contour: str | None = Field(None, description="Контуры печени")
    liver_echostructure: str | None = Field(None, description="Эхоструктура")
    liver_echogenicity: str | None = Field(None, description="Эхогенность")
    
    # Portal vena
    portal_vein: float | None = Field(None, description="V. portae, мм")
    ivc: float | None = Field(None, description="Нижняя полая вена (IVC), мм")
    choledoch: float | None = Field(None, description="Общий желчный проток, мм")
    
    # O't pufagi - Желчный пузырь
    gallbladder_length: float | None = Field(None, description="Длина, мм")
    gallbladder_width: float | None = Field(None, description="Ширина, мм")
    gallbladder_wall: float | None = Field(None, description="Толщина стенки, мм")
    gallbladder_content: str | None = Field(None, description="Содержимое")
    
    # Oshqozon osti bezi - Поджелудочная железа
    pancreas_head: float | None = Field(None, description="Головка, мм")
    pancreas_body: float | None = Field(None, description="Тело, мм")
    pancreas_tail: float | None = Field(None, description="Хвост, мм")
    pancreas_duct: float | None = Field(None, description="Панкреатический проток, мм")
    
    # Taloq - Селезенка
    spleen_length: float | None = Field(None, description="Длина, мм")
    spleen_width: float | None = Field(None, description="Ширина, мм")
    splenic_vein: float | None = Field(None, description="Селезеночная вена, мм")
    
    # Buyrak - Почки
    kidney_right_size: str | None = Field(None, description="Размеры правой почки")
    kidney_right_parenchyma: float | None = Field(None, description="Паренхима правой почки, мм")
    kidney_left_size: str | None = Field(None, description="Размеры левой почки")
    kidney_left_parenchyma: float | None = Field(None, description="Паренхима левой почки, мм")


class GynecologyExamData(BaseModel):
    """Ginekologiya UZI ma'lumotlari - Матка, Кисты, Миома"""
    # Hayz kuni
    last_menstruation: date | None = Field(None, description="День последней менструации")
    
    # Bachadon - Матка
    uterus_position: str | None = Field(None, description="Положение матки")
    uterus_length: float | None = Field(None, description="Длина, мм")
    uterus_width: float | None = Field(None, description="Ширина, мм")
    uterus_thickness: float | None = Field(None, description="Толщина, мм")
    uterus_contour: str | None = Field(None, description="Контуры")
    myometrium_structure: str | None = Field(None, description="Структура миометрия")
    
    # Endometriy
    endometrium_thickness: float | None = Field(None, description="Эндометрий, мм")
    endometrium_structure: str | None = Field(None, description="Эхоструктура эндометрия")
    
    # Bachadon bo'yni - Шейка матки
    cervix_length: float | None = Field(None, description="Длина шейки, мм")
    cervix_width: float | None = Field(None, description="Ширина шейки, мм")
    endocervix: float | None = Field(None, description="Эндоцервикс, мм")
    
    # Tuxumdonlar - Яичники
    ovary_right_size: str | None = Field(None, description="Размеры правого яичника")
    ovary_right_volume: float | None = Field(None, description="Объём правого яичника, мл")
    ovary_right_follicles: str | None = Field(None, description="Фолликулы справа")
    
    ovary_left_size: str | None = Field(None, description="Размеры левого яичника")
    ovary_left_volume: float | None = Field(None, description="Объём левого яичника, мл")
    ovary_left_follicles: str | None = Field(None, description="Фолликулы слева")
    
    # Suyuqlik
    fluid_in_pelvis: str | None = Field(None, description="Жидкость в малом тазу")


class ObstetricsExamData(BaseModel):
    """Homiladorlik UZI ma'lumotlari - Скрининг"""
    # Homiladorlik
    last_menstruation: date | None = Field(None, description="1-й день последней менструации")
    gestational_age_weeks: int | None = Field(None, description="Срок беременности, недели")
    gestational_age_days: int | None = Field(None, description="Срок беременности, дни")
    edd: date | None = Field(None, description="Предполагаемая дата родов")
    fetus_count: int = Field(1, description="Количество плодов")
    
    # Fetometriya
    bpd: float | None = Field(None, description="БПР, мм")
    hc: float | None = Field(None, description="ОГ, мм")
    ac: float | None = Field(None, description="ОЖ, мм")
    fl: float | None = Field(None, description="ДБК, мм")
    hl: float | None = Field(None, description="ДПК, мм")
    fhr: int | None = Field(None, description="ЧСС, уд/мин")
    fetal_weight: int | None = Field(None, description="Масса плода, гр")
    
    # Joylashuv
    presentation: str | None = Field(None, description="Предлежание")
    position: str | None = Field(None, description="Положение плода")
    
    # Platsenta
    placenta_location: str | None = Field(None, description="Расположение плаценты")
    placenta_thickness: float | None = Field(None, description="Толщина плаценты, мм")
    placenta_grade: int | None = Field(None, description="Степень зрелости")
    
    # Suv
    amniotic_fluid: str | None = Field(None, description="Количество вод")
    afi: float | None = Field(None, description="ИАЖ, мм")
    
    # Bachadon bo'yni
    cervix_length: float | None = Field(None, description="Длина шейки матки, мм")
    internal_os: str | None = Field(None, description="Внутренний зев")


class BreastExamData(BaseModel):
    """Sut bezlari UZI ma'lumotlari - Молочные железы"""
    # Hayz kuni
    last_menstruation: date | None = Field(None, description="День ПМЦ")
    
    # O'ng sut bezi - Правая МЖ
    right_thickness: float | None = Field(None, description="Толщина справа, мм")
    right_structure: str | None = Field(None, description="Структура справа")
    right_ducts: str | None = Field(None, description="Протоки справа")
    right_focal_changes: str | None = Field(None, description="Очаговые изменения справа")
    
    # Chap sut bezi - Левая МЖ
    left_thickness: float | None = Field(None, description="Толщина слева, мм")
    left_structure: str | None = Field(None, description="Структура слева")
    left_ducts: str | None = Field(None, description="Протоки слева")
    left_focal_changes: str | None = Field(None, description="Очаговые изменения слева")
    
    # Limfa tugunlari
    lymph_nodes_right: str | None = Field(None, description="ЛУ справа")
    lymph_nodes_left: str | None = Field(None, description="ЛУ слева")
    
    # BI-RADS
    birads: int | None = Field(None, ge=0, le=6, description="BI-RADS категория")


class ThyroidExamData(BaseModel):
    """Qalqonsimon bez UZI ma'lumotlari - Щитовидная железа"""
    # O'ng bo'lak - Правая доля
    right_length: float | None = Field(None, description="Длина справа, мм")
    right_width: float | None = Field(None, description="Ширина справа, мм")
    right_thickness: float | None = Field(None, description="Толщина справа, мм")
    right_volume: float | None = Field(None, description="Объём справа, мл")
    
    # Chap bo'lak - Левая доля
    left_length: float | None = Field(None, description="Длина слева, мм")
    left_width: float | None = Field(None, description="Ширина слева, мм")
    left_thickness: float | None = Field(None, description="Толщина слева, мм")
    left_volume: float | None = Field(None, description="Объём слева, мл")
    
    # Isthmus - Перешеек
    isthmus: float | None = Field(None, description="Перешеек, мм")
    
    # Umumiy
    total_volume: float | None = Field(None, description="Суммарный объём, мл")
    echostructure: str | None = Field(None, description="Эхоструктура")
    echogenicity: str | None = Field(None, description="Эхогенность")
    
    # Limfa tugunlari
    lymph_nodes: str | None = Field(None, description="Лимфоузлы шеи")
