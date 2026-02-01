import { Home, Users, FileText, Settings, Stethoscope } from "lucide-react"

import { Logo } from "@/components/Common/Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth"
import { useLanguage } from "@/hooks/useLanguage"
import { type Item, Main } from "./Main"
import { User } from "./User"

export function AppSidebar() {
  const { user: currentUser } = useAuth()
  const { t } = useLanguage()

  const baseItems: Item[] = [
    { icon: Home, title: t("home"), path: "/" },
    { icon: Users, title: t("patients"), path: "/patients" },
    { icon: Stethoscope, title: t("examinations"), path: "/examinations" },
  ]

  const items = currentUser?.is_superuser
    ? [...baseItems, { icon: Settings, title: t("users"), path: "/admin" }]
    : baseItems

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-6 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
        <div className="flex items-center gap-3">
          <Logo variant="responsive" />
          <span className="font-bold text-lg group-data-[collapsible=icon]:hidden" style={{ color: '#3499a1' }}>
            UziProMax
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Main items={items} />
      </SidebarContent>
      <SidebarFooter>
        <User user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
