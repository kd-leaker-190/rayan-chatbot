import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WelcomeWidget() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardContent>
    </Card>
  )
}
