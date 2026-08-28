import Axios, { AxiosError } from "axios"
import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form"
import { toast } from "sonner"

export const api = Axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  withXSRFToken: true,
})

export const getCsrfToken = () => {
  return api.get("/sanctum/csrf-cookie")
}

type ApiErrorResponse = {
  message?: string
  errors?: Record<string, string[] | string>
}

export function handleApiError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) {
  if (!(error instanceof AxiosError)) {
    toast.error("خطایی رخ داده است.")
    return
  }

  const response = error.response?.data as ApiErrorResponse | undefined

  // Validation errors
  if (response?.errors) {
    Object.entries(response.errors).forEach(([field, messages]) => {
      const message = Array.isArray(messages)
        ? messages[0]
        : String(messages)

      setError(field as FieldPath<T>, {
        type: "server",
        message,
      })
    })
  }

  // General API message
  if (response?.message) {
    toast.error(response.message)
  }
}
