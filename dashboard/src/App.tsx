import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useTheme } from "next-themes"

import { Toaster } from "@/components/ui/sonner"

// Pages
import Login from "@/pages/login"
import Dashboard from "@/pages/dashboard"
import Register from "@/pages/register"

export function App() {
  const { theme } = useTheme()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
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
