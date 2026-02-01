import { TEMPLATE_TYPES } from "@/types/medical"
import { useLanguage } from "@/hooks/useLanguage"

import { AbdominalForm } from "./AbdominalForm"
import { GynecologyForm } from "./GynecologyForm"
import { ObstetricsForm } from "./ObstetricsForm"
import { BreastForm } from "./BreastForm"
import { ThyroidForm } from "./ThyroidForm"

interface ExaminationFormRendererProps {
  templateType: string
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
}

export function ExaminationFormRenderer({ 
  templateType, 
  data, 
  onChange 
}: ExaminationFormRendererProps) {
  const { t, language } = useLanguage()
  
  const templateInfo = TEMPLATE_TYPES[templateType]
  
  if (!templateInfo) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        {t("unknown_template")}
      </div>
    )
  }

  const formProps = {
    data,
    onChange,
    language: language as "ru" | "uz",
  }

  switch (templateInfo.category) {
    case "abdominal":
      return <AbdominalForm {...formProps} />
    case "gynecology":
      return <GynecologyForm {...formProps} templateType={templateType} />
    case "obstetrics":
      return <ObstetricsForm {...formProps} templateType={templateType} />
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
