import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChartWidget() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="shadow-sm lg:col-span-2">
        <CardHeader>
          <Skeleton className="h-5 w-28" />
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <Skeleton className="h-70 w-full rounded-md" />
        </CardContent>
      </Card>

      <Card className="shadow-sm lg:col-span-1">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-9 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-3 w-12 shrink-0" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
