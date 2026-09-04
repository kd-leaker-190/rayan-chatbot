import { useAuth } from "@/hooks/use-auth"
import { useHasWebsite } from "@/hooks/use-has-website"

import StatsWidget from "@/components/dashboard/skeletons/stats-widget"
import ChartWidget from "@/components/dashboard/skeletons/chart-widget"

import Welcome from "@/components/dashboard/widgets/welcome"
import Stats from "@/components/dashboard/widgets/stats"
import Chart from "@/components/dashboard/widgets/chart"
import RecentChats from "@/components/dashboard/widgets/recent-chats"

export default function Dashboard() {
  const { user } = useAuth()
  const { hasWebsite, isLoading, mutateWebsite } = useHasWebsite()

  return (
    <div className="space-y-6">
      <Welcome
        user={user}
        isLoading={isLoading}
        hasWebsite={hasWebsite}
        mutateWebsite={mutateWebsite}
      />

      {isLoading && (
        <>
          <StatsWidget />
          <ChartWidget />
        </>
      )}

      {!isLoading && hasWebsite === true && (
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
