import { Outlet } from "react-router-dom"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/dashboard/sidebar"
import SiteHeader from "@/components/dashboard/header"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar side="right" />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
