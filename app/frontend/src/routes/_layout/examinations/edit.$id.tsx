import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
  ArrowLeft, 
  ArrowRight, 
  Save,
  Stethoscope,
  ClipboardList,
  CheckCircle2
} from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/utils"

import { 
  TEMPLATE_TYPES, 
  type Examination,
} from "@/types/medical"

// Import form components
import { AbdominalForm } from "@/components/ExaminationForms/AbdominalForm"
import { GynecologyForm } from "@/components/ExaminationForms/GynecologyForm"
import { ObstetricsForm } from "@/components/ExaminationForms/ObstetricsForm"
import { BreastForm } from "@/components/ExaminationForms/BreastForm"
import { ThyroidForm } from "@/components/ExaminationForms/ThyroidForm"

export const Route = createFileRoute("/_layout/examinations/edit/$id")({
  component: EditExaminationPage,
})

// API functions
async function getExamination(id: number): Promise<Examination> {
  const response = await fetch(`/api/v1/examinations/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  })
  if (!response.ok) throw new Error("Failed to fetch examination")
  return response.json()
}

async function updateExamination(id: number, data: Partial<Examination>) {
  const response = await fetch(`/api/v1/examinations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to update examination")
  }
  return response.json()
}

// Step definitions for edit mode
const STEPS = [
  { id: 1, title: "measurements", icon: Stethoscope },
  { id: 2, title: "conclusion", icon: ClipboardList },
]

function EditExaminationPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { t, language } = useLanguage()
  const queryClient = useQueryClient()

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1)
  
  // Form state
  const [examinationData, setExaminationData] = useState<Record<string, any>>({})
  const [conclusion, setConclusion] = useState("")
  const [recommendations, setRecommendations] = useState("")
  const [isInitialized, setIsInitialized] = useState(false)

  // Load examination
  const { data: examination, isLoading } = useQuery({
    queryKey: ["examination", id],
    queryFn: () => getExamination(Number(id)),
  })

  // Initialize form with existing data
  useEffect(() => {
    if (examination && !isInitialized) {
      setExaminationData(examination.examination_data || {})
      setConclusion(examination.conclusion || "")
      setRecommendations(examination.recommendations || "")
      setIsInitialized(true)
    }
  }, [examination, isInitialized])

  // Update examination mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<Examination>) => updateExamination(Number(id), data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination", id] })
      toast({ title: t("success"), description: t("examination_saved") })
      navigate({ to: "/examinations/$id", params: { id: String(data.id) } })
    },
    onError: (error: Error) => {
      toast({ title: t("error"), description: error.message, variant: "destructive" })
    },
  })

  const handleSave = (status: "draft" | "completed") => {
    updateMutation.mutate({
      examination_data: examinationData,
      conclusion: conclusion || null,
      recommendations: recommendations || null,
      status,
    })
  }

  // Navigation
  const goNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Render form based on template category
  const renderExaminationForm = () => {
    if (!examination) return null
    
    const templateInfo = TEMPLATE_TYPES[examination.template_type]
    if (!templateInfo) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          {t("unknown_template")}
        </div>
      )
    }

    const formProps = {
      data: examinationData,
      onChange: setExaminationData,
      language: language as "ru" | "uz",
    }

    switch (templateInfo.category) {
      case "abdominal":
        return <AbdominalForm {...formProps} />
      case "gynecology":
        return <GynecologyForm {...formProps} templateType={examination.template_type} />
      case "obstetrics":
        return <ObstetricsForm {...formProps} templateType={examination.template_type} />
      case "breast":
        return <BreastForm {...formProps} />
      case "thyroid":
        return <ThyroidForm {...formProps} />
      default:
        return (
          <div className="p-4 text-center text-muted-foreground">
            {t("form_not_available")}
          </div>
        )
    }
  }

  if (isLoading || !examination) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-muted-foreground">{t("loading")}</div>
      </div>
    )
  }

  const templateInfo = TEMPLATE_TYPES[examination.template_type]

  return (
    <div className="container max-w-5xl mx-auto py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link to="/examinations/$id" params={{ id: String(examination.id) }}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{t("edit")}: {templateInfo?.name || examination.template_type}</h1>
            <p className="text-muted-foreground">{examination.patient_name}</p>
          </div>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.id
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <step.icon className="h-4 w-4" />
                {t(step.title)}
                {currentStep > step.id && <CheckCircle2 className="h-4 w-4 ml-1" />}
              </button>
              {index < STEPS.length - 1 && (
                <div className={cn(
                  "w-8 h-0.5 mx-2",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: Measurements */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {templateInfo?.name || examination.template_type}
                </h2>
                <p className="text-muted-foreground">{t("enter_measurements")}</p>
              </div>
              {renderExaminationForm()}
            </div>
          )}

          {/* Step 2: Conclusion */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">{t("conclusion_title")}</h2>
                <p className="text-muted-foreground">{t("enter_conclusion")}</p>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("conclusion")}</label>
                  <Textarea
                    placeholder={t("conclusion_placeholder")}
                    value={conclusion}
                    onChange={(e) => setConclusion(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("recommendations")}</label>
                  <Textarea
                    placeholder={t("recommendations_placeholder")}
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={goBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("previous")}
        </Button>

        <div className="flex gap-2">
          {currentStep === 2 && (
            <>
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={updateMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {t("save_draft")}
              </Button>
              <Button
                onClick={() => handleSave("completed")}
                disabled={updateMutation.isPending}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {t("save_complete")}
              </Button>
            </>
          )}
          {currentStep < 2 && (
            <Button onClick={goNext}>
              {t("next")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
