interface IUser {
  id: number
  username: string
  email: string
  email_verified_at?: string
  first_name?: string
  last_name?: string
  phone?: string
  phone_verified_at?: string
  avatar?: string
  created_at: string
  updated_at: string
  ownedWorkspaces?: IWorkspace[]
}
