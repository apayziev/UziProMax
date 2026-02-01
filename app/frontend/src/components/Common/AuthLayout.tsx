import { useState, useEffect } from "react"
import { Logo } from "@/components/Common/Logo"
import { Footer } from "./Footer"

interface AuthLayoutProps {
  children: React.ReactNode
}

const services = [
  { uz: "AKUSHERLIK", ru: "АКУШЕРСТВО" },
  { uz: "GINEKOLOGIYA", ru: "ГИНЕКОЛОГИЯ" },
  { uz: "QORIN BO'SHLIG'I", ru: "БРЮШНАЯ ПОЛОСТЬ" },
  { uz: "QALQONSIMON BEZ", ru: "ЩИТОВИДНАЯ ЖЕЛЕЗА" },
  { uz: "KO'KRAK BEZI", ru: "МОЛОЧНАЯ ЖЕЛЕЗА" },
]

function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length)
        setIsVisible(true)
      }, 300)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-16 flex flex-col items-center justify-center">
      <span
        className={`text-xl font-bold text-foreground transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {services[currentIndex].uz}
      </span>
      <span
        className={`text-sm text-foreground/50 transition-all duration-300 delay-75 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {services[currentIndex].ru}
      </span>
    </div>
  )
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-primary/10 relative hidden lg:flex lg:flex-col lg:items-center lg:justify-center gap-6">
        <Logo variant="full" className="h-48" asLink={false} />
        <h1 className="text-4xl font-bold text-center text-foreground">UziProMax</h1>
        <AnimatedText />
        <p className="text-lg text-foreground/70 text-center max-w-md px-4">
          Ultratovush tekshiruvlari uchun professional tizim
        </p>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm px-4">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
