import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  User, 
  Search, 
  Plus,
  Check,
  FileText,
  Stethoscope,
  ClipboardList,
  CheckCircle2
} from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/ui/date-picker"

import { 
  TEMPLATE_TYPES, 
  TEMPLATE_CATEGORIES,
  type Patient, 
  type PatientCreate,
  type ExaminationCreate,
  type PatientListResponse 
} from "@/types/medical"

// Import form components
import { AbdominalForm } from "@/components/ExaminationForms/AbdominalForm"
import { GynecologyForm } from "@/components/ExaminationForms/GynecologyForm"
import { ObstetricsForm } from "@/components/ExaminationForms/ObstetricsForm"
import { BreastForm } from "@/components/ExaminationForms/BreastForm"
import { ThyroidForm } from "@/components/ExaminationForms/ThyroidForm"

export const Route = createFileRoute("/_layout/examinations/new")({
  component: NewExaminationPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      patient_id: search.patient_id ? Number(search.patient_id) : undefined,
    }
  },
})

// API functions
async function searchPatients(query: string): Promise<PatientListResponse> {
  const params = new URLSearchParams({ query, per_page: "10" })
  const response = await fetch(`/api/v1/patients?${params}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  })
  if (!response.ok) throw new Error("Failed to search patients")
  return response.json()
}

async function getPatient(id: number): Promise<Patient> {
  const response = await fetch(`/api/v1/patients/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  })
  if (!response.ok) throw new Error("Failed to fetch patient")
  return response.json()
}

async function createPatient(data: PatientCreate): Promise<Patient> {
  const response = await fetch("/api/v1/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to create patient")
  }
  return response.json()
}

async function createExamination(data: ExaminationCreate) {
  const response = await fetch("/api/v1/examinations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to create examination")
  }
  return response.json()
}

// Step definitions
const STEPS = [
  { id: 1, title: "template", icon: FileText },
  { id: 2, title: "patient", icon: User },
  { id: 3, title: "measurements", icon: Stethoscope },
  { id: 4, title: "conclusion", icon: ClipboardList },
]

function NewExaminationPage() {
  const navigate = useNavigate()
  const search = useSearch({ from: "/_layout/examinations/new" })
  const { toast } = useToast()
  const { t, language } = useLanguage()

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1)
  
  // Form state
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patientSearchQuery, setPatientSearchQuery] = useState("")
  const [templateType, setTemplateType] = useState<string>("")
  const [examinationData, setExaminationData] = useState<Record<string, any>>({})
  const [conclusion, setConclusion] = useState("")
  const [recommendations, setRecommendations] = useState("")

  // New patient dialog
  const [newPatientOpen, setNewPatientOpen] = useState(false)
  const [newPatient, setNewPatient] = useState<PatientCreate>({
    last_name: "",
    first_name: "",
    middle_name: "",
    gender: "female",
    phone: "+998",
    birth_date: "",
  })

  // Load patient from URL if provided
  useEffect(() => {
    if (search.patient_id) {
      getPatient(search.patient_id).then((patient) => {
        setSelectedPatient(patient)
        if (patient) setCurrentStep(1) // Start from template selection
      }).catch(console.error)
    }
  }, [search.patient_id])

  // Search patients query
  const { data: searchResults } = useQuery({
    queryKey: ["patient-search", patientSearchQuery],
    queryFn: () => searchPatients(patientSearchQuery),
    enabled: patientSearchQuery.length > 1,
  })

  // Create patient mutation
  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: (patient) => {
      setSelectedPatient(patient)
      setNewPatientOpen(false)
      setNewPatient({ 
        last_name: "",
        first_name: "",
        middle_name: "",
        gender: "female", 
        phone: "+998", 
        birth_date: "",
      })
      toast({ title: t("success"), description: t("patient_added") })
      // Avtomatik keyingi qadamga o'tish
      setCurrentStep(3)
    },
    onError: (error: Error) => {
      toast({ title: t("error"), description: error.message, variant: "destructive" })
    },
  })

  // Create examination mutation
  const createMutation = useMutation({
    mutationFn: createExamination,
    onSuccess: (data) => {
      toast({ title: t("success"), description: t("examination_saved") })
      navigate({ to: `/examinations/${data.id}` })
    },
    onError: (error: Error) => {
      toast({ title: t("error"), description: error.message, variant: "destructive" })
    },
  })

  const handleSave = (status: "draft" | "completed") => {
    const data: ExaminationCreate = {
      patient_id: selectedPatient!.id,
      template_type: templateType,
      examination_data: examinationData,
      conclusion: conclusion || null,
      recommendations: recommendations || null,
      status,
    }
    createMutation.mutate(data)
  }

  const handleCreatePatient = () => {
    if (!newPatient.last_name?.trim() || !newPatient.first_name?.trim()) {
      toast({ title: t("error"), description: t("name_required"), variant: "destructive" })
      return
    }
    createPatientMutation.mutate({
      ...newPatient,
      phone: newPatient.phone === "+998" ? "" : newPatient.phone,
    })
  }

  // Navigation
  const canGoNext = () => {
    switch (currentStep) {
      case 1: return !!templateType
      case 2: return !!selectedPatient
      case 3: return true // Measurements are optional
      case 4: return true
      default: return false
    }
  }

  const goNext = () => {
    if (canGoNext() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Template categories grouped
  const templatesByCategory = Object.entries(TEMPLATE_TYPES).reduce((acc, [key, value]) => {
    if (!acc[value.category]) acc[value.category] = []
    acc[value.category].push({ key, ...value })
    return acc
  }, {} as Record<string, Array<{ key: string; name: string; name_ru: string; category: string }>>)

  // Render form based on template type
  const renderMeasurementsForm = () => {
    if (!templateType) return null

    const category = TEMPLATE_TYPES[templateType]?.category
    const props = {
      data: examinationData,
      onChange: setExaminationData,
      language: language as "uz" | "ru",
    }

    switch (category) {
      case "abdominal":
        return <AbdominalForm {...props} />
      case "gynecology":
        return <GynecologyForm {...props} templateType={templateType} />
      case "obstetrics":
        return <ObstetricsForm {...props} templateType={templateType} />
      case "breast":
        return <BreastForm {...props} />
      case "thyroid":
        return <ThyroidForm {...props} />
      default:
        return <div className="text-muted-foreground text-center py-10">Form not available</div>
    }
  }

  // Step translations
  const stepTitles: Record<string, { uz: string; ru: string }> = {
    template: { uz: "Shablon tanlash", ru: "Выбор шаблона" },
    patient: { uz: "Bemor", ru: "Пациент" },
    measurements: { uz: "O'lchovlar", ru: "Измерения" },
    conclusion: { uz: "Xulosa", ru: "Заключение" },
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/examinations">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{t("new_examination")}</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {STEPS.map((step, index) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id
          
          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => {
                  // Allow going back to completed steps
                  if (step.id < currentStep || (step.id === currentStep)) {
                    setCurrentStep(step.id)
                  }
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                  isCompleted && "bg-primary/10 text-primary cursor-pointer",
                  isCurrent && "bg-primary text-primary-foreground",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground",
                  step.id < currentStep && "cursor-pointer hover:bg-primary/20"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span className="text-sm font-medium hidden sm:inline">
                  {language === "ru" ? stepTitles[step.title].ru : stepTitles[step.title].uz}
                </span>
                <span className="text-sm font-medium sm:hidden">{step.id}</span>
              </button>
              {index < STEPS.length - 1 && (
                <div className={cn(
                  "w-8 h-0.5 mx-1",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <Card className="min-h-[350px]">
        <CardContent className="p-6">
          {/* Step 1: Template Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold mb-1">
                  {language === "ru" ? "Выберите тип исследования" : "Tekshiruv turini tanlang"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {language === "ru" ? "Нажмите на карточку для выбора" : "Tanlash uchun kartochkani bosing"}
                </p>
              </div>

              {Object.entries(templatesByCategory).map(([category, templates]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    {language === "ru" 
                      ? TEMPLATE_CATEGORIES[category as keyof typeof TEMPLATE_CATEGORIES]?.name_ru 
                      : TEMPLATE_CATEGORIES[category as keyof typeof TEMPLATE_CATEGORIES]?.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {templates.map((template) => (
                      <button
                        key={template.key}
                        onClick={() => setTemplateType(template.key)}
                        className={cn(
                          "relative px-3 py-2 rounded-md border text-left transition-all hover:border-primary/50",
                          templateType === template.key
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border"
                        )}
                      >
                        <span className="text-sm font-medium flex items-center gap-2">
                          {language === "ru" ? template.name_ru : template.name}
                          {templateType === template.key && (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Patient Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold mb-1">
                  {language === "ru" ? "Выберите пациента" : "Bemorni tanlang"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {language === "ru" 
                    ? "Найдите существующего или добавьте нового" 
                    : "Mavjud bemorni toping yoki yangi qo'shing"}
                </p>
              </div>

              {selectedPatient ? (
                <div className="max-w-md mx-auto">
                  <Card className="border-primary bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-lg break-words">{selectedPatient.full_name}</p>
                          <p className="text-muted-foreground">
                            {selectedPatient.gender === "female" 
                              ? (language === "ru" ? "Женский" : "Ayol") 
                              : (language === "ru" ? "Мужской" : "Erkak")}
                            {selectedPatient.birth_date && ` • ${selectedPatient.birth_date}`}
                          </p>
                          {selectedPatient.phone && (
                            <p className="text-muted-foreground">{selectedPatient.phone}</p>
                          )}
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => setSelectedPatient(null)}
                      >
                        {language === "ru" ? "Выбрать другого" : "Boshqa bemor tanlash"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-3">
                  {/* Search Input with Add Button */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={language === "ru" ? "Введите имя или телефон..." : "Ism yoki telefon kiriting..."}
                        value={patientSearchQuery}
                        onChange={(e) => setPatientSearchQuery(e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="h-11 shrink-0"
                      onClick={() => setNewPatientOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {language === "ru" ? "Новый пациент" : "Yangi bemor"}
                    </Button>
                  </div>

                  {/* Search Results */}
                  {patientSearchQuery.length > 1 && (
                    <div className="border rounded-lg divide-y max-h-[250px] overflow-auto">
                      {searchResults?.items.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          <p>{language === "ru" ? "Пациент не найден" : "Bemor topilmadi"}</p>
                          <Button
                            variant="link"
                            className="mt-1 text-primary"
                            onClick={() => setNewPatientOpen(true)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            {language === "ru" ? "Добавить нового" : "Yangi qo'shish"}
                          </Button>
                        </div>
                      ) : (
                        searchResults?.items.map((patient) => {
                          // Calculate age
                          const age = patient.birth_date ? (() => {
                            const today = new Date()
                            const birth = new Date(patient.birth_date)
                            let years = today.getFullYear() - birth.getFullYear()
                            const m = today.getMonth() - birth.getMonth()
                            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) years--
                            return years
                          })() : null
                          
                          return (
                            <button
                              key={patient.id}
                              onClick={() => {
                                setSelectedPatient(patient)
                                setPatientSearchQuery("")
                              }}
                              className="w-full p-3 text-left hover:bg-muted/50 flex items-center gap-3 transition-colors"
                            >
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{patient.full_name}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  {age !== null && (
                                    <span>{age} {language === "ru" ? "лет" : "yosh"}</span>
                                  )}
                                  {age !== null && patient.phone && <span>•</span>}
                                  {patient.phone && <span>{patient.phone}</span>}
                                </div>
                              </div>
                              {patient.examination_count !== undefined && patient.examination_count > 0 && (
                                <div className="text-right shrink-0">
                                  <span className="text-xs bg-muted px-2 py-1 rounded">
                                    {patient.examination_count} {language === "ru" ? "иссл." : "teksh."}
                                  </span>
                                </div>
                              )}
                            </button>
                          )
                        })
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Measurements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {language === "ru" 
                      ? TEMPLATE_TYPES[templateType]?.name_ru 
                      : TEMPLATE_TYPES[templateType]?.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === "ru" ? "Введите результаты измерений" : "O'lchov natijalarini kiriting"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Пациент" : "Bemor"}
                  </p>
                  <p className="font-medium">{selectedPatient?.full_name}</p>
                </div>
              </div>

              {renderMeasurementsForm()}
            </div>
          )}

          {/* Step 4: Conclusion */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {language === "ru" ? "Заключение и рекомендации" : "Xulosa va tavsiyalar"}
                </h2>
                <p className="text-muted-foreground">
                  {language === "ru" 
                    ? "Напишите заключение по результатам исследования" 
                    : "Tekshiruv natijalari bo'yicha xulosa yozing"}
                </p>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Тип исследования" : "Tekshiruv turi"}
                  </p>
                  <p className="font-medium">
                    {language === "ru" 
                      ? TEMPLATE_TYPES[templateType]?.name_ru 
                      : TEMPLATE_TYPES[templateType]?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Пациент" : "Bemor"}
                  </p>
                  <p className="font-medium">{selectedPatient?.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === "ru" ? "Дата" : "Sana"}
                  </p>
                  <p className="font-medium">{new Date().toLocaleDateString(language === "ru" ? "ru-RU" : "uz-UZ")}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base">
                    {language === "ru" ? "Заключение (ЗАКЛЮЧЕНИЕ)" : "Xulosa (ЗАКЛЮЧЕНИЕ)"}
                  </Label>
                  <Textarea
                    placeholder={language === "ru" 
                      ? "Напишите заключение по результатам исследования..." 
                      : "Tekshiruv xulosasini yozing..."}
                    value={conclusion}
                    onChange={(e) => setConclusion(e.target.value)}
                    rows={5}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base">
                    {language === "ru" ? "Рекомендации (РЕКОМЕНДАЦИИ)" : "Tavsiyalar (РЕКОМЕНДАЦИИ)"}
                  </Label>
                  <Textarea
                    placeholder={language === "ru" 
                      ? "Напишите рекомендации..." 
                      : "Tavsiyalarni yozing..."}
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    rows={4}
                    className="text-base"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "ru" ? "Назад" : "Orqaga"}
        </Button>

        <div className="flex gap-2">
          {currentStep === 4 ? (
            <>
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={createMutation.isPending}
              >
                {language === "ru" ? "Сохранить черновик" : "Qoralama saqlash"}
              </Button>
              <Button
                onClick={() => handleSave("completed")}
                disabled={createMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {language === "ru" ? "Сохранить" : "Saqlash"}
              </Button>
            </>
          ) : (
            <Button
              onClick={goNext}
              disabled={!canGoNext()}
            >
              {language === "ru" ? "Далее" : "Keyingi"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* New Patient Dialog */}
      <Dialog open={newPatientOpen} onOpenChange={setNewPatientOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {language === "ru" ? "Новый пациент" : "Yangi bemor"}
            </DialogTitle>
            <DialogDescription>
              {language === "ru" 
                ? "Введите данные пациента" 
                : "Bemor ma'lumotlarini kiriting"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>{language === "ru" ? "Фамилия *" : "Familiya *"}</Label>
                <Input
                  placeholder={language === "ru" ? "Иванов" : "Aliyev"}
                  value={newPatient.last_name || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "ru" ? "Имя *" : "Ism *"}</Label>
                <Input
                  placeholder={language === "ru" ? "Иван" : "Ali"}
                  value={newPatient.first_name || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{language === "ru" ? "Отчество" : "Sharifi"}</Label>
              <Input
                placeholder={language === "ru" ? "Иванович" : "Valiyevich"}
                value={newPatient.middle_name || ""}
                onChange={(e) => setNewPatient({ ...newPatient, middle_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{language === "ru" ? "Телефон *" : "Telefon *"}</Label>
              <Input
                placeholder="+998 90 123 45 67"
                value={newPatient.phone || "+998"}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d+]/g, "")
                  // Always keep +998 prefix
                  if (!value.startsWith("+998")) {
                    value = "+998"
                  }
                  if (value.length > 13) value = value.slice(0, 13)
                  setNewPatient({ ...newPatient, phone: value })
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{language === "ru" ? "Пол" : "Jinsi"}</Label>
                <ToggleGroup
                  type="single"
                  value={newPatient.gender}
                  onValueChange={(value: "male" | "female") => {
                    if (value) setNewPatient({ ...newPatient, gender: value })
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <ToggleGroupItem 
                    value="female" 
                    className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {language === "ru" ? "Женский" : "Ayol"}
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="male" 
                    className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {language === "ru" ? "Мужской" : "Erkak"}
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="space-y-2">
                <Label>
                  {language === "ru" ? "Дата рождения" : "Tug'ilgan sana"}
                  {newPatient.birth_date && (
                    <span className="text-foreground font-medium ml-1">
                      ({(() => {
                        const today = new Date()
                        const birth = new Date(newPatient.birth_date)
                        let age = today.getFullYear() - birth.getFullYear()
                        const m = today.getMonth() - birth.getMonth()
                        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
                        return age
                      })()} {language === "ru" ? "лет" : "yosh"})
                    </span>
                  )}
                </Label>
                <DatePicker
                  value={newPatient.birth_date}
                  onChange={(date) => setNewPatient({ 
                    ...newPatient, 
                    birth_date: date 
                      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                      : null 
                  })}
                  language={language as "uz" | "ru"}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewPatientOpen(false)}>
              {t("cancel")}
            </Button>
            <Button 
              onClick={handleCreatePatient}
              disabled={createPatientMutation.isPending || !newPatient.last_name?.trim() || !newPatient.first_name?.trim()}
            >
              {createPatientMutation.isPending 
                ? (language === "ru" ? "Сохранение..." : "Saqlanmoqda...") 
                : t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
