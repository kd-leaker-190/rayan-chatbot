interface IWebsite {
  id: number
  title: string
  domain: string
  membership: {
    operator_id: number
    role_id: null
    status: string
  }
}
