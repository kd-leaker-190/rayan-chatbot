import useSWR from "swr"
import type { AxiosError } from "axios"

import { api, fetcher } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"
import { toast } from "sonner"

export function useAuth() {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<IApiResponse<IUser>>("/api/v1/user", fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  })

  const isUnauthorized = (error as AxiosError)?.response?.status === 401

  const logout = async () => {
    try {
      const res = await api.post("/logout")
      toast.success(res.data.message || "خروج با موفقیت انجام شد")

      mutate(undefined)

      return res.data
    } catch (error) {
      toast.error("خطا در خروج از حساب کاربری")
      throw error
    }
  }

  return {
    user: response?.data,
    isLoading,
    isAuthenticated: Boolean(response?.data) && !isLoading,
    isGuest: isUnauthorized || (!response?.data && !isLoading),
    isEmailVerified: Boolean(response?.data?.email_verified_at),
    error,
    mutate,
    logout,
  }
}
