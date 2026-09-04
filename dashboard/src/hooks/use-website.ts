import useSWR from "swr"
import { fetcher } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"
import { useAuth } from "@/hooks/use-auth"

export function useWebsite() {
  const { isAuthenticated } = useAuth()

  const { data, error, isLoading, mutate } = useSWR<
    IApiResponse<IHasWebsiteStatus>
  >(isAuthenticated ? "/api/v1/user/has-website" : null, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    hasWebsite: data?.data?.has_website ?? null,
    isLoading,
    error,
    mutateWebsite: mutate,
  }
}
