import { toast } from "sonner"

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const showToast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      toast.error(title || "Xatolik!", { description })
    } else {
      toast.success(title || "Muvaffaqiyat!", { description })
    }
  }

  return {
    toast: showToast,
  }
}
