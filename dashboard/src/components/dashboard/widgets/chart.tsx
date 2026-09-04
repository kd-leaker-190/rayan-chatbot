import { ActivityChart } from "@/components/charts/ActivityCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Chart() {
  return (
    <Card className="shadow-sm lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base">فعالیت چت ها</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="w-full overflow-x-auto">
          <ActivityChart />
        </div>
      </CardContent>
    </Card>
  )
}
