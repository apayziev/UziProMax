import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
  ArrowLeft,
  Stethoscope,
  ClipboardList,
} from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"

import { TEMPLATE_TYPES, type Examination } from "@/types/medical"
import { 
  ExaminationFormRenderer, 
  ConclusionForm, 
  WizardStepper, 
  WizardNavigation,
  type WizardStep 
} from "@/components/ExaminationForms"

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
const STEPS: WizardStep[] = [
  { id: 1, title: "measurements", icon: Stethoscope },
  { id: 2, title: "conclusion", icon: ClipboardList },
]

function EditExaminationPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { t } = useLanguage()
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
  const goNext = () => currentStep < 2 && setCurrentStep(currentStep + 1)
  const goBack = () => currentStep > 1 && setCurrentStep(currentStep - 1)

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
        <WizardStepper 
          steps={STEPS} 
          currentStep={currentStep} 
          onStepClick={setCurrentStep} 
        />
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
              <ExaminationFormRenderer
                templateType={examination.template_type}
                data={examinationData}
                onChange={setExaminationData}
              />
            </div>
          )}

          {/* Step 2: Conclusion */}
          {currentStep === 2 && (
            <ConclusionForm
              conclusion={conclusion}
              recommendations={recommendations}
              onConclusionChange={setConclusion}
              onRecommendationsChange={setRecommendations}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <WizardNavigation
        currentStep={currentStep}
        totalSteps={2}
        isSubmitting={updateMutation.isPending}
        onBack={goBack}
        onNext={goNext}
        onSaveDraft={() => handleSave("draft")}
        onSaveComplete={() => handleSave("completed")}
        showSaveButtons={true}
      />
    </div>
  )
}
