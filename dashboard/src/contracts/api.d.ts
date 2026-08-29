export interface IApiResponse<T> {
  status: "success" | "error"
  message: string
  data: T
}

interface IApiErrorResponse {
  message?: string
  errors?: Record<string, string[] | string>
}
