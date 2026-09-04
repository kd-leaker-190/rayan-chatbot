import useSWR from "swr"

import { fetcher } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"
import { useAuth } from "@/hooks/use-auth"
import { websiteKeys } from "@/lib/query-keys"

export function useHasWebsite() {
  const { isAuthenticated } = useAuth()

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<IApiResponse<IHasWebsiteStatus>>(
    isAuthenticated ? websiteKeys.hasWebsite : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    hasWebsite: data?.data?.has_website ?? null,
    isLoading,
    error,
    mutateWebsite: mutate,
  }
}
