import useSWR from "swr"

import { useAuth } from "@/hooks/use-auth"

import StatsWidget from "@/components/dashboard/skeletons/stats-widget"
import ChartWidget from "@/components/dashboard/skeletons/chart-widget"

import Welcome from "@/components/dashboard/widgets/welcome"
import Stats from "@/components/dashboard/widgets/stats"
import Chart from "@/components/dashboard/widgets/chart"
import RecentChats from "@/components/dashboard/widgets/recent-chats"
import type { IApiResponse } from "@/contracts/api"
import { fetcher } from "@/lib/api"

export default function Dashboard() {
  const { user } = useAuth()
  const { data, isLoading } = useSWR<IApiResponse<IWebsite[]>>(
    "/api/v1/websites",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const websites = data?.data ?? []
  const hasWebsite = websites.length > 0

  return (
    <div className="space-y-6">
      <Welcome
        user={user}
        isLoading={isLoading}
        hasWebsite={isLoading ? null : hasWebsite}
      />

      {isLoading && (
        <>
          <StatsWidget />
          <ChartWidget />
        </>
      )}

      {!isLoading && hasWebsite && (
        <>
          <Stats />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Chart />
            <RecentChats />
          </div>
        </>
      )}
    </div>
  )
}
