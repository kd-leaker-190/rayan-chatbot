import useSWR from "swr"

import { fetcher } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"

export function useWebsite() {
  const { data, isLoading, mutate } = useSWR<IApiResponse<IWebsite[]>>(
    "/api/v1/websites",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const websites = data?.data ?? []
  const hasWebsite = websites.length > 0

  return {
    websites,
    hasWebsite,
    isLoading,
    mutate,
  }
}
