interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  email_verified_at?: string
  status: "active" | "inactive" | "suspended"
  created_at: string
  updated_at: string
  owned_websites: IWebsite[]
  operated_websites: IWebsite[]
}
