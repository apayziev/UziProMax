import { createContext, useContext, useState, ReactNode } from "react"

export type Language = "uz" | "ru"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  uz: {
    // Login page
    "welcome": "Xush kelibsiz!",
    "login_subtitle": "Tizimga kirish uchun ma'lumotlaringizni kiriting",
    "phone": "Telefon raqami",
    "password": "Parol",
    "login": "Kirish",
    "phone_placeholder": "+998 90 123 45 67",
    "password_placeholder": "Parolingizni kiriting",
    
    // Sidebar
    "home": "Bosh sahifa",
    "patients": "Bemorlar",
    "examinations": "Tekshiruvlar",
    "new_examination": "Yangi tekshiruv",
    "settings": "Sozlamalar",
    
    // Dashboard
    "hi": "Salom",
    "welcome_back": "Qaytganingizdan xursandmiz!",
    
    // Patients
    "add_patient": "Yangi bemor",
    "add_new_patient": "Yangi bemor qo'shish",
    "enter_patient_info": "Bemor ma'lumotlarini kiriting",
    "search_patients": "Bemorlarni qidirish...",
    "search_by_name_phone": "Ism yoki telefon bo'yicha qidirish...",
    "full_name": "To'liq ismi (F.I.O)",
    "name": "Ism",
    "birth_date": "Tug'ilgan sana",
    "phone_number": "Telefon",
    "gender": "Jinsi",
    "male": "Erkak",
    "female": "Ayol",
    "address": "Manzil",
    "notes": "Izohlar",
    "save": "Saqlash",
    "saving": "Saqlanmoqda...",
    "cancel": "Bekor qilish",
    "select": "Tanlang",
    "actions": "Amallar",
    "no_patients": "Bemorlar topilmadi",
    "patient_info": "Bemor haqida ma'lumot",
    "edit_patient": "Bemorni tahrirlash",
    "delete_patient": "Bemorni o'chirish",
    "view_examinations": "Tekshiruvlarni ko'rish",
    "total_patients": "Jami bemorlar",
    "all_patients_list": "Barcha bemorlar ro'yxati",
    "confirm_delete": "O'chirishni tasdiqlang",
    "delete_warning": "Bu amalni qaytarib bo'lmaydi",
    "delete": "O'chirish",
    "deleted": "O'chirildi",
    "patient_added": "Yangi bemor qo'shildi",
    "patient_deleted": "Bemor o'chirildi",
    "name_required": "Ism kiritish shart",
    "registered": "Ro'yxatga olingan",
    "total": "Jami",
    "patients_count": "ta bemor",
    
    // Examinations
    "select_patient": "Bemorni tanlang",
    "select_template": "Shablon turini tanlang",
    "conclusion": "Xulosa",
    "recommendations": "Tavsiyalar",
    "print": "Chop etish",
    "edit": "Tahrirlash",
    "view": "Ko'rish",
    "draft": "Qoralama",
    "completed": "Tugallangan",
    "printed": "Chop etilgan",
    "no_examinations": "Tekshiruvlar topilmadi",
    "all_types": "Barcha turlar",
    "all_statuses": "Barcha holatlar",
    "all_templates": "Barcha shablonlar",
    "filter": "Filter",
    "examination_date": "Tekshiruv sanasi",
    "template_type": "Shablon turi",
    "examination_type": "Tekshiruv turi",
    "status": "Holat",
    "date": "Sana",
    "patient": "Bemor",
    "created": "Yaratilgan",
    "all_examinations_list": "Barcha UZI tekshiruvlar ro'yxati",
    "examination_deleted": "Tekshiruv o'chirildi",
    "examinations_count": "ta tekshiruv",
    
    // Admin
    "users": "Foydalanuvchilar",
    "manage_users": "Foydalanuvchi akkountlari va huquqlarini boshqarish",
    "add_user": "Foydalanuvchi qo'shish",
    "email": "Email",
    "role": "Lavozim",
    "superuser": "Administrator",
    "user": "Foydalanuvchi",
    "active": "Faol",
    "inactive": "Faol emas",
    "you": "Siz",
    
    // Footer
    "copyright": "© 2026 UziProMax. Barcha huquqlar himoyalangan.",
    
    // Common
    "loading": "Yuklanmoqda...",
    "error": "Xatolik",
    "success": "Muvaffaqiyat!",
    "no_data": "Ma'lumot topilmadi",
    "previous": "Oldingi",
    "next": "Keyingi",
    "page": "Sahifa",
    "of": "dan",
    "logout": "Chiqish",
    "profile": "Profil",
  },
  ru: {
    // Login page
    "welcome": "Добро пожаловать!",
    "login_subtitle": "Введите данные для входа в систему",
    "phone": "Номер телефона",
    "password": "Пароль",
    "login": "Войти",
    "phone_placeholder": "+998 90 123 45 67",
    "password_placeholder": "Введите пароль",
    
    // Sidebar
    "home": "Главная",
    "patients": "Пациенты",
    "examinations": "Исследования",
    "new_examination": "Новое исследование",
    "settings": "Настройки",
    
    // Dashboard
    "hi": "Привет",
    "welcome_back": "Рады видеть вас снова!",
    
    // Patients
    "add_patient": "Новый пациент",
    "add_new_patient": "Добавить нового пациента",
    "enter_patient_info": "Введите данные пациента",
    "search_patients": "Поиск пациентов...",
    "search_by_name_phone": "Поиск по имени или телефону...",
    "full_name": "Полное имя (Ф.И.О)",
    "name": "Имя",
    "birth_date": "Дата рождения",
    "phone_number": "Телефон",
    "gender": "Пол",
    "male": "Мужской",
    "female": "Женский",
    "address": "Адрес",
    "notes": "Примечания",
    "save": "Сохранить",
    "saving": "Сохранение...",
    "cancel": "Отмена",
    "select": "Выберите",
    "actions": "Действия",
    "no_patients": "Пациенты не найдены",
    "patient_info": "Информация о пациенте",
    "edit_patient": "Редактировать пациента",
    "delete_patient": "Удалить пациента",
    "view_examinations": "Просмотр исследований",
    "total_patients": "Всего пациентов",
    "all_patients_list": "Список всех пациентов",
    "confirm_delete": "Подтвердите удаление",
    "delete_warning": "Это действие нельзя отменить",
    "delete": "Удалить",
    "deleted": "Удалено",
    "patient_added": "Новый пациент добавлен",
    "patient_deleted": "Пациент удален",
    "name_required": "Имя обязательно",
    "registered": "Зарегистрирован",
    "total": "Всего",
    "patients_count": "пациентов",
    
    // Examinations
    "select_patient": "Выберите пациента",
    "select_template": "Выберите тип исследования",
    "conclusion": "Заключение",
    "recommendations": "Рекомендации",
    "print": "Печать",
    "edit": "Редактировать",
    "view": "Просмотр",
    "draft": "Черновик",
    "completed": "Завершено",
    "printed": "Напечатано",
    "no_examinations": "Исследования не найдены",
    "all_types": "Все типы",
    "all_statuses": "Все статусы",
    "all_templates": "Все шаблоны",
    "filter": "Фильтр",
    "examination_date": "Дата исследования",
    "template_type": "Тип шаблона",
    "examination_type": "Тип исследования",
    "status": "Статус",
    "date": "Дата",
    "patient": "Пациент",
    "created": "Создано",
    "all_examinations_list": "Список всех УЗИ исследований",
    "examination_deleted": "Исследование удалено",
    "examinations_count": "исследований",
    
    // Admin
    "users": "Пользователи",
    "manage_users": "Управление аккаунтами и правами доступа",
    "add_user": "Добавить пользователя",
    "email": "Email",
    "role": "Роль",
    "superuser": "Администратор",
    "user": "Пользователь",
    "active": "Активный",
    "inactive": "Неактивный",
    "you": "Вы",
    
    // Footer
    "copyright": "© 2026 UziProMax. Все права защищены.",
    
    // Common
    "loading": "Загрузка...",
    "error": "Ошибка",
    "success": "Успешно!",
    "no_data": "Данные не найдены",
    "previous": "Предыдущая",
    "next": "Следующая",
    "page": "Страница",
    "of": "из",
    "logout": "Выход",
    "profile": "Профиль",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("uzipromax-language")
    return (saved as Language) || "uz"
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("uzipromax-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
