import useSWR from "swr"
import { fetcher } from "@/lib/api"
import type { IApiResponse, IPaginatedData } from "@/contracts/api"

export function useOperators(page: number = 1, websiteId?: string | number) {
  const { data, isLoading, mutate } = useSWR<IApiResponse<IPaginatedData<IOperator>>>(
    `/websites/${websiteId}/operators?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const operators = data?.data?.data ?? []
  const hasOperators = operators.length > 0
  const links = data?.data?.links
  const meta = data?.data?.meta

  return {
    operators,
    hasOperators,
    links,
    meta,
    isLoading,
    mutate,
  }
}

export function useOperator(websiteId?: string | number, operatorId?: string | number) {
  const { data, error, isLoading, mutate } = useSWR<IApiResponse<IOperator>>(
    `/website/${websiteId}/operators/${operatorId}`,
    fetcher
  )

  return {
    operator: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
