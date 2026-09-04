// src/hooks/use-website.ts

import useSWR, { useSWRConfig } from "swr"
import { useState } from "react"

import { api, fetcher } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"
import { useAuth } from "@/hooks/use-auth"
import {
  type CreateWorkspaceSchema,
} from "@/schemas/workspace"
import { websiteKeys } from "@/lib/query-keys"

export function useWebsite() {
  const { isAuthenticated } = useAuth()
  const { mutate: globalMutate } = useSWRConfig()
  const [isCreating, setIsCreating] = useState(false)

  const key = isAuthenticated ? websiteKeys.all : null

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<IApiResponse<IWebsite[]>>(key, fetcher, {
    revalidateOnFocus: false,
  })

  const createWebsite = async (values: CreateWorkspaceSchema) => {
    try {
      setIsCreating(true)

      const response = await api.post<IApiResponse<unknown>>(
        websiteKeys.all,
        values
      )

      await Promise.all([
        mutate(),
        globalMutate(websiteKeys.hasWebsite),
      ])

      return response.data
    } finally {
      setIsCreating(false)
    }
  }

  return {
    websites: data?.data ?? [],
    isLoading,
    isCreating,
    error,
    mutateWebsites: mutate,
    createWebsite,
  }
}
