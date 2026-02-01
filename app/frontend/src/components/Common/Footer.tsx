import { useLanguage } from "@/hooks/useLanguage"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-4 px-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-muted-foreground text-sm">
          {t("copyright")}
        </p>
      </div>
    </footer>
  )
}
