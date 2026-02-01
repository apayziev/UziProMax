import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-4 px-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-muted-foreground text-sm">
          © {currentYear} UziProMax. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  )
}
