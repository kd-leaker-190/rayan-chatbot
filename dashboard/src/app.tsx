import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useTheme } from "next-themes"

import { Toaster } from "@/components/ui/sonner"

// Layouts
import ProtectedLayout from "@/components/layouts/protected-layout"
import GuestLayout from "@/components/layouts/guest-layout"
import VerifyEmailLayout from "@/components/layouts/verify-email-layout"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

// Pages
import Login from "@/pages/auth/login"
import Dashboard from "@/pages/dashboard"
import Register from "@/pages/auth/register"
import VerifyEmail from "@/pages/dashboard/verify-email"
import ForgotPassword from "@/pages/auth/forgot-password"
import PasswordReset from "@/pages/auth/password-reset"
import Websites from "@/pages/dashboard/websites"

export function App() {
  const { theme } = useTheme()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<PasswordReset />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard/verify-email" element={<VerifyEmail />} />

          <Route element={<VerifyEmailLayout />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/websites" element={<Websites />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Toaster
        position="top-center"
        closeButton={true}
        richColors={true}
        dir="rtl"
        style={{ fontFamily: "Vazirmatn" }}
        theme={theme as "light" | "dark" | "system"}
      />
    </BrowserRouter>
  )
}

export default App
