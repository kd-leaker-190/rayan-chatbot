import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, ArrowUpLeft, CreditCard, DollarSign, Users } from "lucide-react"

const stats = [
  {
    title: "مجموع درآمد",
    value: "۴۵,۲۳۱,۰۰۰ تومان",
    change: "+۲۰.۱٪ نسبت به ماه قبل",
    icon: DollarSign,
  },
  {
    title: "اشتراک‌های جدید",
    value: "+۲,۳۵۰",
    change: "+۱۸۰.۱٪ نسبت به ماه قبل",
    icon: Users,
  },
  {
    title: "فروش کل",
    value: "+۱۲,۲۳۴",
    change: "+۱۹٪ نسبت به ماه قبل",
    icon: CreditCard,
  },
  {
    title: "کاربران فعال",
    value: "+۵۷۳",
    change: "+۲۰۱ در ساعت گذشته",
    icon: Activity,
  },
]

export default function Dashboard() {
  return (
    <main className="flex-1 space-y-6 p-6 text-right">
      {/* Welcome Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            پیشخوان و آمار کلی
          </h1>
          <p className="text-sm text-muted-foreground">
            خلاصه‌ای از عملکرد سیستم، فروش و کاربران فعال.
          </p>
        </div>
      </div>

      {/* Metric Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                {/* Notice: In RTL, upward positive progress points to the left */}
                <ArrowUpLeft className="h-3 w-3 text-emerald-500" />
                <span>{item.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>نمودار درآمد</CardTitle>
            <CardDescription>مقایسه دوره‌ای فروش ماهانه</CardDescription>
          </CardHeader>
          <CardContent className="m-4 flex h-75 items-center justify-center rounded-md border border-dashed bg-muted/40">
            <span className="text-sm text-muted-foreground">
              [نمودار تحلیلی Recharts یا Tremor]
            </span>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>آخرین تراکنش‌ها</CardTitle>
            <CardDescription>
              ۲۶۵ تراکنش در این ماه انجام شده است.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "علی رضایی",
                  email: "ali@example.com",
                  amount: "+۱,۹۹۰,۰۰۰ تومان",
                },
                {
                  name: "نرگس کریمی",
                  email: "narges@example.com",
                  amount: "+۳۹۰,۰۰۰ تومان",
                },
                {
                  name: "رضا حسینی",
                  email: "reza@example.com",
                  amount: "+۲,۴۰۰,۰۰۰ تومان",
                },
                {
                  name: "مهسا احمدی",
                  email: "mahsa@example.com",
                  amount: "+۹۹۰,۰۰۰ تومان",
                },
              ].map((user, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm leading-none font-medium">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="font-mono text-sm font-medium">
                    {user.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
