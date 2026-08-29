import useSWR from "swr"
import type { AxiosError } from "axios"

import { fetcher } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"

export function useAuth() {
  const { data: response, error, isLoading, mutate } = useSWR<IApiResponse<IUser>>(
    "/api/v1/user",
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const isUnauthorized = (error as AxiosError)?.response?.status === 401

  return {
    user: response?.data,
    isLoading,
    isAuthenticated: Boolean(response?.data) && !isLoading,
    isGuest: isUnauthorized || (!response?.data && !isLoading),
    isEmailVerified: Boolean(response?.data?.email_verified_at),
    error,
    mutate,
  }
}
