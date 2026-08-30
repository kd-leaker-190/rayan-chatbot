import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-muted/40">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
