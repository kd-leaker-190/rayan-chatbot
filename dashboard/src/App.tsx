import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useTheme } from "next-themes"

import { Toaster } from "@/components/ui/sonner"

// Layouts
import ProtectedLayout from "@/components/layouts/protected-layout"
import GuestLayout from "@/components/layouts/guest-layout"
import VerifyEmailLayout from "@/components/layouts/verify-email-layout"

// Pages
import Login from "@/pages/login"
import Dashboard from "@/pages/dashboard"
import Register from "@/pages/register"
import VerifyEmail from "@/pages/verify-email"

export function App() {
  const { theme } = useTheme()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard/verify-email" element={<VerifyEmail />} />

          <Route element={<VerifyEmailLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
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
