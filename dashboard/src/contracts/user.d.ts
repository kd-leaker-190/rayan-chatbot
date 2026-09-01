interface IUser {
  id: number
  name: string
  email: string
  email_verified_at?: string
  phone?: string
  phone_verified_at?: string
  avatar?: string
  created_at: string
  updated_at: string
  ownedWorkspaces?: IWorkspace[]
}
