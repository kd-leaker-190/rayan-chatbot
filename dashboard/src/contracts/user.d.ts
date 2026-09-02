interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  email_verified_at?: string
  phone?: string
  phone_verified_at?: string
  avatar?: string
  created_at: string
  updated_at: string
  owned_websites: IWebsite[]
  operated_websites: IWebsite[]
}
