import { recentChats } from "@/data/demo-data";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentChats() {
  return (
    <Card className="shadow-sm lg:col-span-1">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base">چت های اخیر</CardTitle>
        <a
          href="#"
          className="text-xs text-green-600 hover:underline sm:text-sm"
        >
          مشاهده همه
        </a>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentChats.map((c) => (
          <div key={c.id} className="flex items-center gap-3">
            <Avatar className="size-9 shrink-0">
              <AvatarFallback className="text-xs">
                {c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("‌")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-none font-medium">{c.name}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {c.msg}
              </p>
            </div>
            <div className="shrink-0 text-left">
              <span className="text-[11px] text-muted-foreground">
                {c.time}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
