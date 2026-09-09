import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useTheme } from "next-themes"

import { Toaster } from "@/components/ui/sonner"

// Layouts
import ProtectedLayout from "@/components/layouts/protected-layout"
import GuestLayout from "@/components/layouts/guest-layout"
import VerifyEmailLayout from "@/components/layouts/verify-email-layout"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

// Pages
import RegisterPage from "@/pages/auth/register"
import LoginPage from "@/pages/auth/login"
import ForgotPasswordPage from "@/pages/auth/forgot-password"
import PasswordResetPage from "@/pages/auth/password-reset"
import DashboardPage from "@/pages/dashboard"
import VerifyEmailPage from "@/pages/dashboard/verify-email"
import WebsitesPage from "@/pages/dashboard/websites"
import WebsiteManagementPage from "@/pages/dashboard/websites/domain/management"
import WebsiteRolesPage from "@/pages/dashboard/websites/roles"
import CreateWebsiteRolePage from "@/pages/dashboard/websites/roles/create"

export function App() {
  const { theme } = useTheme()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="auth">
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="password-reset/:token"
              element={<PasswordResetPage />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="dashboard">
            <Route path="verify-email" element={<VerifyEmailPage />} />

            <Route element={<VerifyEmailLayout />}>
              <Route element={<DashboardLayout />}>
                <Route path="" element={<DashboardPage />} />

                <Route path="websites">
                  <Route path="" element={<WebsitesPage />} />
                  <Route
                    path=":id/management"
                    element={<WebsiteManagementPage />}
                  />
                  <Route
                    path=":id/roles"
                    element={<WebsiteRolesPage />}
                  />
                  <Route
                    path=":id/roles/create"
                    element={<CreateWebsiteRolePage />}
                  />
                </Route>
              </Route>
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
