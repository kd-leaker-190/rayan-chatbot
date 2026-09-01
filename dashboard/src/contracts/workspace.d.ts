interface IWorkspace {
  id: number
  name: string
  bio: string
  status: "active" | "inactive" | "suspended"
  created_at: string
  updated_at: string
  owner: IUser
}
