import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"

export default function VerifyEmailLayout() {
  const { isEmailVerified } = useAuth()

  if (!isEmailVerified) {
    return <Navigate to="/dashboard/verify-email" replace />
  }

  return <Outlet />
}
