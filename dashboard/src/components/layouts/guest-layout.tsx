// src/layouts/GuestLayout.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

import { Spinner } from "@/components/ui/spinner"

export default function GuestLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted">
        <Spinner className={cn("w-10", "h-10", "text-brand")} />
      </div>
    )
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/dashboard"
    return <Navigate to={from} replace />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
