import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher({ variant = "default" }: { variant?: "default" | "minimal" }) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "uz" ? "ru" : "uz")
  }

  if (variant === "minimal") {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleLanguage}
        className="gap-2 font-medium"
      >
        <span className="text-base">{language === "uz" ? "🇺🇿" : "🇷🇺"}</span>
        <span className="text-sm">{language === "uz" ? "O'zb" : "Рус"}</span>
      </Button>
    )
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="gap-2"
    >
      <span className="text-base">{language === "uz" ? "🇺🇿" : "🇷🇺"}</span>
      <span>{language === "uz" ? "O'zbekcha" : "Русский"}</span>
    </Button>
  )
}
