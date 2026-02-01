import { CheckCircle2, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/hooks/useLanguage"

export interface WizardStep {
  id: number
  title: string
  icon: LucideIcon
}

interface WizardStepperProps {
  steps: WizardStep[]
  currentStep: number
  onStepClick?: (stepId: number) => void
}

export function WizardStepper({ steps, currentStep, onStepClick }: WizardStepperProps) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => onStepClick?.(step.id)}
            disabled={!onStepClick}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              currentStep === step.id
                ? "bg-primary text-primary-foreground"
                : currentStep > step.id
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground",
              onStepClick && "cursor-pointer hover:opacity-80"
            )}
          >
            <step.icon className="h-4 w-4" />
            {t(step.title)}
            {currentStep > step.id && <CheckCircle2 className="h-4 w-4 ml-1" />}
          </button>
          {index < steps.length - 1 && (
            <div className={cn(
              "w-8 h-0.5 mx-2",
              currentStep > step.id ? "bg-primary" : "bg-muted"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}
