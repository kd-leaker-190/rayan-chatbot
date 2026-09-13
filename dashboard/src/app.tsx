import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useTheme } from "next-themes"

import { Toaster } from "@/components/ui/sonner"

// Layouts
import ProtectedLayout from "@/components/layouts/protected-layout"
import GuestLayout from "@/components/layouts/guest-layout"
import VerifyEmailLayout from "@/components/layouts/verify-email-layout"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

// Auth Pages
import RegisterPage from "@/pages/auth/register"
import LoginPage from "@/pages/auth/login"
import ForgotPasswordPage from "@/pages/auth/forgot-password"
import PasswordResetPage from "@/pages/auth/password-reset"

// Dashboard Pages
import DashboardPage from "@/pages/dashboard"
import VerifyEmailPage from "@/pages/dashboard/verify-email"

// Dashboard Websites Pages
import WebsitesPage from "@/pages/dashboard/websites"
import WebsiteManagementPage from "@/pages/dashboard/websites/domain/management"

// Dashboard Website Roles Pages
import WebsiteRolesPage from "@/pages/dashboard/websites/roles"
import CreateWebsiteRolePage from "@/pages/dashboard/websites/roles/create"
import EditWebsiteRolePage from "@/pages/dashboard/websites/roles/edit"
import ShowWebsiteRolePage from "@/pages/dashboard/websites/roles/show"

// Dashboard Website Operators Pages
import WebsiteOperatorsPage from "@/pages/dashboard/websites/operators"
import CreateWebsiteOperatorPage from "@/pages/dashboard/websites/operators/create"
import EditWebsiteOperatorPage from "@/pages/dashboard/websites/operators/edit"
import ShowWebsiteOperatorPage from "@/pages/dashboard/websites/operators/show"

export function App() {
  const { theme } = useTheme()

  return (
    <BrowserRouter>
      <Routes>
        {/* Guest content */}
        <Route element={<GuestLayout />}>
          {/* Auth routes */}
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

        {/* Protected content */}
        <Route element={<ProtectedLayout />}>
          {/* Dashboard Routes */}
          <Route path="dashboard">
            {/* Verify email page */}
            <Route path="verify-email" element={<VerifyEmailPage />} />

            {/* Email verified user content */}
            <Route element={<VerifyEmailLayout />}>
              {/* Dashboard layout */}
              <Route element={<DashboardLayout />}>
                {/* Dashboard main page */}
                <Route path="" element={<DashboardPage />} />

                {/* Dashboard websites management */}
                <Route path="websites">
                  {/* Dashboard websites management */}
                  <Route path="" element={<WebsitesPage />} />
                  <Route
                    path=":id/management"
                    element={<WebsiteManagementPage />}
                  />

                  {/* Dashboard roles management */}
                  <Route path=":id/roles" element={<WebsiteRolesPage />} />
                  <Route
                    path=":id/roles/create"
                    element={<CreateWebsiteRolePage />}
                  />
                  <Route
                    path=":id/roles/:roleId/edit"
                    element={<EditWebsiteRolePage />}
                  />
                  <Route
                    path=":id/roles/:roleId/show"
                    element={<ShowWebsiteRolePage />}
                  />

                  {/* Dadhboard operators management */}
                  <Route path=":id/operators" element={<WebsiteOperatorsPage />} />
                  <Route
                    path=":id/operators/create"
                    element={<CreateWebsiteOperatorPage />}
                  />
                  <Route
                    path=":id/operators/:operatorId/edit"
                    element={<EditWebsiteOperatorPage />}
                  />
                  <Route
                    path=":id/operators/:operatorId/show"
                    element={<ShowWebsiteOperatorPage />}
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
