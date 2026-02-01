import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"

interface WizardNavigationProps {
  currentStep: number
  totalSteps: number
  canGoNext?: boolean
  isSubmitting?: boolean
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  onSaveComplete?: () => void
  showSaveButtons?: boolean
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  canGoNext = true,
  isSubmitting = false,
  onBack,
  onNext,
  onSaveDraft,
  onSaveComplete,
  showSaveButtons = false,
}: WizardNavigationProps) {
  const { t } = useLanguage()
  const isLastStep = currentStep === totalSteps
  const isFirstStep = currentStep === 1

  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("previous")}
      </Button>

      <div className="flex gap-2">
        {showSaveButtons && isLastStep && (
          <>
            {onSaveDraft && (
              <Button
                variant="outline"
                onClick={onSaveDraft}
                disabled={isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                {t("save_draft")}
              </Button>
            )}
            {onSaveComplete && (
              <Button
                onClick={onSaveComplete}
                disabled={isSubmitting}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {t("save_complete")}
              </Button>
            )}
          </>
        )}
        {!isLastStep && (
          <Button onClick={onNext} disabled={!canGoNext}>
            {t("next")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
