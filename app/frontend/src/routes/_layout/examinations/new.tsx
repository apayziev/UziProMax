import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { ArrowLeft, Save, User, Calendar, Search } from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import { 
  TEMPLATE_TYPES, 
  TEMPLATE_CATEGORIES,
  type Patient, 
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

function NewExaminationPage() {
  const navigate = useNavigate()
  const search = useSearch({ from: "/_layout/examinations/new" })
  const { toast } = useToast()

  // State
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patientSearchOpen, setPatientSearchOpen] = useState(false)
  const [patientSearchQuery, setPatientSearchQuery] = useState("")
  const [templateType, setTemplateType] = useState<string>("")
  const [examinationDate, setExaminationDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [examinationData, setExaminationData] = useState<Record<string, any>>({})
  const [conclusion, setConclusion] = useState("")
  const [recommendations, setRecommendations] = useState("")

  // Load patient from URL if provided
  useEffect(() => {
    if (search.patient_id) {
      getPatient(search.patient_id).then(setSelectedPatient).catch(console.error)
    }
  }, [search.patient_id])

  // Search patients query
  const { data: searchResults } = useQuery({
    queryKey: ["patient-search", patientSearchQuery],
    queryFn: () => searchPatients(patientSearchQuery),
    enabled: patientSearchQuery.length > 1,
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createExamination,
    onSuccess: (data) => {
      toast({ title: "Muvaffaqiyat!", description: "Tekshiruv saqlandi" })
      navigate({ to: `/examinations/${data.id}` })
    },
    onError: (error: Error) => {
      toast({ title: "Xatolik", description: error.message, variant: "destructive" })
    },
  })

  const handleSave = (status: "draft" | "completed") => {
    if (!selectedPatient) {
      toast({ title: "Xatolik", description: "Bemorni tanlang", variant: "destructive" })
      return
    }
    if (!templateType) {
      toast({ title: "Xatolik", description: "Shablon turini tanlang", variant: "destructive" })
      return
    }

    const data: ExaminationCreate = {
      patient_id: selectedPatient.id,
      examination_date: examinationDate,
      template_type: templateType,
      examination_data: examinationData,
      conclusion: conclusion || null,
      recommendations: recommendations || null,
      status,
    }

    createMutation.mutate(data)
  }

  // Get template category for grouping
  const templatesByCategory = Object.entries(TEMPLATE_TYPES).reduce((acc, [key, value]) => {
    if (!acc[value.category]) acc[value.category] = []
    acc[value.category].push({ key, ...value })
    return acc
  }, {} as Record<string, Array<{ key: string; name: string; name_ru: string }>>)

  // Render form based on template type
  const renderForm = () => {
    if (!templateType) {
      return (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          Shablon turini tanlang
        </div>
      )
    }

    const category = TEMPLATE_TYPES[templateType]?.category
    const props = {
      data: examinationData,
      onChange: setExaminationData,
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
        return <div>Form not found for {templateType}</div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/examinations">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Yangi tekshiruv</h1>
          <p className="text-muted-foreground">UZI tekshiruv ma'lumotlarini kiriting</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave("draft")}
            disabled={createMutation.isPending}
          >
            Qoralama sifatida saqlash
          </Button>
          <Button onClick={() => handleSave("completed")} disabled={createMutation.isPending}>
            <Save className="mr-2 h-4 w-4" />
            Saqlash
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Patient & Settings */}
        <div className="space-y-6">
          {/* Patient Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Bemor
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPatient ? (
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg bg-muted/50">
                    <p className="font-medium">{selectedPatient.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedPatient.gender === "female" ? "Ayol" : "Erkak"}
                      {selectedPatient.birth_date && ` • ${selectedPatient.birth_date}`}
                    </p>
                    {selectedPatient.phone && (
                      <p className="text-sm text-muted-foreground">{selectedPatient.phone}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Boshqa bemor tanlash
                  </Button>
                </div>
              ) : (
                <Popover open={patientSearchOpen} onOpenChange={setPatientSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="mr-2 h-4 w-4" />
                      Bemorni qidirish...
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Ism yoki telefon..."
                        value={patientSearchQuery}
                        onValueChange={setPatientSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>Bemor topilmadi</CommandEmpty>
                        <CommandGroup>
                          {searchResults?.items.map((patient) => (
                            <CommandItem
                              key={patient.id}
                              onSelect={() => {
                                setSelectedPatient(patient)
                                setPatientSearchOpen(false)
                              }}
                            >
                              <div>
                                <p className="font-medium">{patient.full_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {patient.phone || "Telefon yo'q"}
                                </p>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </CardContent>
          </Card>

          {/* Examination Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tekshiruv sozlamalari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sana</Label>
                <Input
                  type="date"
                  value={examinationDate}
                  onChange={(e) => setExaminationDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tekshiruv turi</Label>
                <Select value={templateType} onValueChange={setTemplateType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Shablon tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(templatesByCategory).map(([category, templates]) => (
                      <div key={category}>
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                          {TEMPLATE_CATEGORIES[category as keyof typeof TEMPLATE_CATEGORIES]?.name_ru || category}
                        </div>
                        {templates.map((t) => (
                          <SelectItem key={t.key} value={t.key}>
                            {t.name_ru}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content - Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {templateType
                  ? TEMPLATE_TYPES[templateType]?.name_ru || "Tekshiruv"
                  : "Tekshiruv ma'lumotlari"}
              </CardTitle>
              <CardDescription>
                Barcha o'lchovlar va natijalarni kiriting
              </CardDescription>
            </CardHeader>
            <CardContent>{renderForm()}</CardContent>
          </Card>

          {/* Conclusion */}
          <Card>
            <CardHeader>
              <CardTitle>Xulosa va tavsiyalar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Xulosa (ЗАКЛЮЧЕНИЕ)</Label>
                <Textarea
                  placeholder="Tekshiruv xulosasini yozing..."
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Tavsiyalar (РЕКОМЕНДАЦИИ)</Label>
                <Textarea
                  placeholder="Tavsiyalarni yozing..."
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
