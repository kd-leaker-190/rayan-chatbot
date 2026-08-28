import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Login from "./pages/login"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard">

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
