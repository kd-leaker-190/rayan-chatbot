interface IOperator {
  id: string
  user: IUser
  website: IWebsite
  role: IRole
  status: "active" | "inactive" | "suspended"
  created_at: string
  updated_at: string
}
