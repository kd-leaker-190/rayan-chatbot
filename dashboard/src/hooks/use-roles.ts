import useSWR from "swr"
import { fetcher } from "@/lib/api"
import type { IApiResponse, IPaginatedData } from "@/contracts/api"

export function useRoles(page: number = 1, websiteId?: number | string) {
  const { data, isLoading, mutate } = useSWR<
    IApiResponse<IPaginatedData<IRole>>
  >(`/websites/${websiteId}/roles?page=${page}`, fetcher, {
    revalidateOnFocus: false,
  })

  const roles: IRole[] = data?.data?.data ?? []
  const hasRole = roles.length > 0
  const links = data?.data?.links
  const meta = data?.data?.meta

  return {
    roles,
    hasRole,
    links,
    meta,
    isLoading,
    mutate,
  }
}

export function useRoleOptions(websiteId?: number | string) {
  const { data, isLoading, mutate } = useSWR<IApiResponse<IRole[]>>(
    websiteId
      ? `/websites/${websiteId}/roles/options`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    roles: data?.data ?? [],
    isLoading,
    mutate,
  }
}

export function useRole(websiteId?: string | number, roleId?: string | number) {
  const { data, error, isLoading, mutate } = useSWR<IApiResponse<IRole>>(
    `/websites/${websiteId}/roles/${roleId}`,
    fetcher
  )

  return {
    role: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function usePermissions() {
  const { data, isLoading } = useSWR<IApiResponse<IPermission[]>>(
    "/permissions",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const permissions = data?.data ?? []

  return {
    permissions,
    isLoading,
  }
}
