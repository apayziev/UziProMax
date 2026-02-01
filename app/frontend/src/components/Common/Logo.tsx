import { Link } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "icon" | "responsive"
  className?: string
  asLink?: boolean
}

export function Logo({
  variant = "full",
  className,
  asLink = true,
}: LogoProps) {
  const logoSrc = "/assets/images/favicon.png"

  const content =
    variant === "responsive" ? (
      <>
        <img
          src={logoSrc}
          alt="UziProMax"
          className={cn(
            "h-10 w-auto group-data-[collapsible=icon]:hidden rounded",
            className,
          )}
        />
        <img
          src={logoSrc}
          alt="UziProMax"
          className={cn(
            "size-8 hidden group-data-[collapsible=icon]:block rounded",
            className,
          )}
        />
      </>
    ) : (
      <img
        src={logoSrc}
        alt="UziProMax"
        className={cn(variant === "full" ? "h-10 w-auto rounded" : "size-8 rounded", className)}
      />
    )

  if (!asLink) {
    return content
  }

  return <Link to="/">{content}</Link>
}
