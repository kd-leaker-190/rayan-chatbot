import { createRoot } from "react-dom/client"

import "@/assets/css/globals.css"
import App from "./app.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
