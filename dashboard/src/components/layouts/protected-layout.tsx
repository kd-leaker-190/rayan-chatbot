import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuth } from "@/hooks/use-auth"

import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export default function ProtectedLayout() {
  const { isGuest, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className={cn("w-10", "h-10", "text-brand")} />
      </div>
    )
  }

  if (isGuest) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
