import { useAuth } from "@/hooks/use-auth"
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Users,
  Bot,
  Clock,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ActivityChart } from "@/components/charts/ActivityCart"

const stats = [
  {
    title: "کل چت ها",
    value: "124",
    change: "+12%",
    up: true,
    icon: MessageSquare,
  },
  {
    title: "پاسخ های هوش مصنوعی",
    value: "89",
    change: "+16%",
    up: true,
    icon: Bot,
  },
  {
    title: "چت های اوپراتورها",
    value: "35",
    change: "+7%",
    up: true,
    icon: Users,
  },
  {
    title: "میانگین زمان پاسخگویی",
    value: "1.8 دقیقه",
    change: "-32%",
    up: false,
    icon: Clock,
  },
]

const recentChats = [
  {
    id: 1,
    name: "شکیب زیدی",
    msg: "سلام، سفارش من کی ارسال میشه؟",
    time: "2 دقیقه پیش",
  },
  {
    id: 2,
    name: "شکیب زیدی",
    msg: "بله، دقیقاً همین موضوع رو می‌خوام...",
    time: "12 دقیقه پیش",
  },
  {
    id: 3,
    name: "شکیب زیدی",
    msg: "ممنون از کمکتون 🙏",
    time: "28 دقیقه پیش",
  },
  {
    id: 4,
    name: "شکیب زیدی",
    msg: "لطفاً فاکتور سفارش رو بفرستید",
    time: "1 ساعت پیش",
  },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">داشبورد</h1>
        <p className="text-sm text-muted-foreground">
          {user?.username} خوش آمدید 👋
        </p>
      </div>

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
      </div>
    </div>
  )
}
