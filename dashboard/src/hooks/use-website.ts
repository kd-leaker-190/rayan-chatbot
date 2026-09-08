import useSWR from "swr"
import { fetcher } from "@/lib/api"
import type { IApiResponse, IPaginatedData } from "@/contracts/api"

export function useWebsites(page: number = 1) {
  const { data, isLoading, mutate } = useSWR<IApiResponse<IPaginatedData<IWebsite>>>(
    `/websites?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const websites: IWebsite[] = data?.data?.data ?? []
  const hasWebsite = websites.length > 0
  const links = data?.data?.links
  const meta = data?.data?.meta

  return {
    websites,
    hasWebsite,
    links,
    meta,
    isLoading,
    mutate,
  }
}

export function useWebsite(id?: string | number) {
  const { data, error, isLoading, mutate } = useSWR<IApiResponse<IWebsite>>(
    id ? `/websites/${id}` : null,
    fetcher
  )

  return {
    website: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
