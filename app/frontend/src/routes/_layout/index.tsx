import { createFileRoute } from "@tanstack/react-router"

import useAuth from "@/hooks/useAuth"
import { useLanguage } from "@/hooks/useLanguage"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
  head: () => ({
    meta: [
      {
        title: "Dashboard - UziProMax",
      },
    ],
  }),
})

function Dashboard() {
  const { user: currentUser } = useAuth()
  const { t } = useLanguage()

  return (
    <div>
      <div>
        <h1 className="text-2xl truncate max-w-sm">
          {t("hi")}, {currentUser?.first_name || currentUser?.username} 👋
        </h1>
        <p className="text-muted-foreground">
          {t("welcome_back")}
        </p>
      </div>
    </div>
  )
}
