import type { IApiErrorResponse } from "@/contracts/api"
import Axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form"
import { toast } from "sonner"

export const api = Axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  withXSRFToken: true,
})

let csrfPromise: Promise<unknown> | null = null

// بررسی وجود کوکی در مرورگر
const hasXsrfToken = (): boolean => {
  return document.cookie
    .split("; ")
    .some((row) => row.startsWith("XSRF-TOKEN="))
}

export const getCsrfToken = () => {
  if (!csrfPromise) {
    csrfPromise = api.get("/sanctum/csrf-cookie").finally(() => {
      csrfPromise = null
    })
  }

  return csrfPromise
}

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const method = config.method?.toLowerCase()
  
  const isMutatingMethod = ["post", "put", "patch", "delete"].includes(method || "")

  if (isMutatingMethod && !hasXsrfToken()) {
    await getCsrfToken()
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true

      await getCsrfToken()

      return api(originalRequest)
    }

    return Promise.reject(error)
  }
)

export function handleApiError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  if (!(error instanceof AxiosError)) {
    toast.error("خطایی رخ داده است.")
    return
  }

  const response = error.response?.data as IApiErrorResponse | undefined

  // Validation errors
  if (response?.errors) {
    Object.entries(response.errors).forEach(([field, messages]) => {
      const message = Array.isArray(messages) ? messages[0] : String(messages)

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

export const fetcher = async <T = unknown>(url: string): Promise<T> => {
  const response = await api.get<T>(url)
  return response.data
}
