import useSWR from "swr"
import { api, fetcher } from "@/lib/api"
import type { IApiResponse, IPaginatedData } from "@/contracts/api"

export function useWebsites(page: number = 1, search: string = "") {
  const { data, isLoading, mutate } = useSWR<
    IApiResponse<IPaginatedData<IWebsite>>
  >(
    [`/websites`, page, search],
    ([url, page, search]) =>
      api
        .get(url, {
          params: {
            page,
            search: search || undefined,
          },
        })
        .then((res) => res.data),
    {
      keepPreviousData: true,
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
