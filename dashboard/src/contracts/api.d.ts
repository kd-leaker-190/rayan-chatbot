export interface IApiResponse<T> {
  status: "success" | "error"
  message: string
  data: T
}

export interface IPaginationLink {
  url: string | null
  label: string
  page: number | null
  active: boolean
}

export interface IPaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: IPaginationLink[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface IPaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface IPaginatedData<T> {
  data: T[]
  links: IPaginationLinks
  meta: IPaginationMeta
}

export interface IApiErrorResponse {
  message?: string
  errors?: Record<string, string[] | string>
}
