interface IRole {
  id: number
  name: string
  slug: string
  description: string
  created_at: string
  updated_at: string
  permissions: IPermission[]
  website?: IWebsite
  operators?: IOperator[]
}

interface IRoleOption {
  id: number
  name: string
}

interface IPermission {
  id: number
  name: string
  slug: string
  description: string
  created_at: string
  updated_at: string
  roles: IRole[]
}
