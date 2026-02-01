import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/hooks/useLanguage"

interface ConclusionFormProps {
  conclusion: string
  recommendations: string
  onConclusionChange: (value: string) => void
  onRecommendationsChange: (value: string) => void
}

export function ConclusionForm({
  conclusion,
  recommendations,
  onConclusionChange,
  onRecommendationsChange,
}: ConclusionFormProps) {
  const { t } = useLanguage()

  return (
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
            onChange={(e) => onConclusionChange(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("recommendations")}</label>
          <Textarea
            placeholder={t("recommendations_placeholder")}
            value={recommendations}
            onChange={(e) => onRecommendationsChange(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  )
}
