/**
 * Patient and Examination Types for UziProMax
 */

// Patient types
export interface Patient {
  id: number
  last_name: string
  first_name: string
  middle_name: string | null
  full_name: string // computed from backend
  birth_date: string | null
  gender: "male" | "female"
  phone: string | null
  address: string | null
  notes: string | null
  created_at: string
  updated_at: string | null
  examination_count?: number
}

export interface PatientCreate {
  last_name: string
  first_name: string
  middle_name?: string | null
  birth_date?: string | null
  gender: "male" | "female"
  phone?: string | null
  address?: string | null
  notes?: string | null
}

export interface PatientUpdate {
  last_name?: string
  first_name?: string
  middle_name?: string | null
  birth_date?: string | null
  gender?: "male" | "female"
  phone?: string | null
  address?: string | null
  notes?: string | null
}

export interface PatientListResponse {
  items: Patient[]
  total: number
  page: number
  per_page: number
  pages: number
}

// Examination types
export interface Examination {
  id: number
  patient_id: number
  doctor_id: number
  examination_date: string
  template_type: string
  examination_data: Record<string, any>
  conclusion: string | null
  recommendations: string | null
  notes: string | null
  status: "draft" | "completed" | "printed"
  created_at: string
  updated_at: string | null
  patient_name?: string
  doctor_name?: string
  template_name?: string
}

export interface ExaminationCreate {
  patient_id: number
  examination_date?: string  // Optional - defaults to today
  template_type: string
  examination_data?: Record<string, any>
  conclusion?: string | null
  recommendations?: string | null
  notes?: string | null
  status?: "draft" | "completed" | "printed"
}

export interface ExaminationUpdate {
  examination_date?: string
  examination_data?: Record<string, any>
  conclusion?: string | null
  recommendations?: string | null
  notes?: string | null
  status?: "draft" | "completed" | "printed"
}

export interface ExaminationListResponse {
  items: Examination[]
  total: number
  page: number
  per_page: number
  pages: number
}

// Template types
export interface TemplateType {
  name: string
  name_ru: string
  category: string
}

export interface TemplateTypesResponse {
  templates: Record<string, TemplateType>
}

// Statistics
export interface ExaminationStatistics {
  total: number
  today: number
  by_template_type: Record<string, number>
  by_status: Record<string, number>
}

// Template categories
export const TEMPLATE_CATEGORIES = {
  gynecology: { name: "Ginekologiya", name_ru: "Гинекология", icon: "female" },
  obstetrics: { name: "Akusherlik", name_ru: "Акушерство", icon: "baby" },
  abdominal: { name: "Qorin bo'shlig'i", name_ru: "Брюшная полость", icon: "stomach" },
  breast: { name: "Sut bezlari", name_ru: "Молочные железы", icon: "breast" },
  thyroid: { name: "Qalqonsimon bez", name_ru: "Щитовидная железа", icon: "thyroid" },
  vascular: { name: "Tomirlar", name_ru: "Сосуды", icon: "heart" },
}

// Template types list
export const TEMPLATE_TYPES: Record<string, TemplateType> = {
  abdominal: { name: "Qorin bo'shlig'i", name_ru: "Брюшное", category: "abdominal" },
  gynecology_uterus: { name: "Bachadon", name_ru: "Матка", category: "gynecology" },
  gynecology_cyst: { name: "Tuxumdon kistasi", name_ru: "Киста яичников", category: "gynecology" },
  gynecology_myoma: { name: "Mioma", name_ru: "Миома", category: "gynecology" },
  breast: { name: "Sut bezlari", name_ru: "Молочные железы", category: "breast" },
  thyroid: { name: "Qalqonsimon bez", name_ru: "Щитовидная железа", category: "thyroid" },
  thyroid_child: { name: "Bolalar qalqonsimon bezi", name_ru: "Детская ЩЖ", category: "thyroid" },
  obstetrics_1: { name: "1-trimestr skrining", name_ru: "I триместр скрининг", category: "obstetrics" },
  obstetrics_2: { name: "2-trimestr skrining", name_ru: "II триместр скрининг", category: "obstetrics" },
  obstetrics_3: { name: "3-trimestr skrining", name_ru: "III триместр скрининг", category: "obstetrics" },
  obstetrics_multi: { name: "Ko'p homilali", name_ru: "Многоплодная", category: "obstetrics" },
  doppler: { name: "Homila doppleri", name_ru: "Допплер плода", category: "obstetrics" },
}
