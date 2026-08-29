import { useAuth } from "@/hooks/use-auth"

export default function Dashboard() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div>
      <h1>Dashboard page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
