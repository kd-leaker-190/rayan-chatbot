interface IWebsite {
  id: number
  title: string
  domain: string
  status: "active" | "inactive" | "suspended"
  created_at: string
  updated_at: string
}
