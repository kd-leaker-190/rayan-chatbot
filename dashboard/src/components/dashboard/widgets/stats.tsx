import { Card, CardContent } from "@/components/ui/card";
import { stats } from "@/data/demo-data";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.title} className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{s.title}</span>
              <s.icon className="size-4 shrink-0" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold">{s.value}</span>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  s.up ? "text-green-600" : "text-red-500"
                }`}
              >
                {s.up ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {s.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
