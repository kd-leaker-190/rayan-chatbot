import { useState } from "react"

import {
  Globe,
  ExternalLink,
  Settings,
  MessageSquare,
  Users,
  Plus,
  MoreVertical,
  ShieldCheck,
  UserCheck,
  Copy,
  Check,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MOCK_WEBSITES = [
  {
    id: 1,
    title: "فروشگاه آنلاین دیجی‌استور",
    domain: "digistore.ir",
    role: "owner",
    status: "active",
    activeOperatorsCount: 3,
    totalConversations: 142,
    createdAt: "۱۴۰۳/۰۵/۱۲",
  },
  {
    id: 2,
    title: "آکادمی برنامه‌نویسی کدلاین",
    domain: "codeline.academy",
    role: "operator",
    status: "active",
    activeOperatorsCount: 8,
    totalConversations: 850,
    createdAt: "۱۴۰۳/۰۴/۰۱",
  },
  {
    id: 3,
    title: "شرکت بازرگانی آریا",
    domain: "aria-trading.com",
    role: "owner",
    status: "inactive",
    activeOperatorsCount: 0,
    totalConversations: 19,
    createdAt: "۱۴۰۳/۰۶/۱۰",
  },
]

export default function Websites() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopyDomain = (id: number, domain: string) => {
    navigator.clipboard.writeText(domain)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* هدر صفحه و دکمه ایجاد */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">وب‌سایت‌ها</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            این قسمت مربوط به مدیریت وبسایت هایی می باشد که شما مالک آن هستید یا
            دسترسی اوپراتور به آن را دارید.
          </p>
        </div>
        <Button
          className="flex items-center gap-2 self-start shadow-sm sm:self-auto"
          size="lg"
        >
          <Plus className="h-4 w-4" />
          افزودن وب‌سایت جدید
        </Button>
      </div>

      <Separator />

      {/* گرید کارت‌های وبسایت */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_WEBSITES.map((site) => (
          <Card
            key={site.id}
            className="group relative flex flex-col justify-between border bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
          >
            <div>
              {/* هدر کارت */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="truncate text-base font-bold transition-colors group-hover:text-primary">
                        {site.title}
                      </CardTitle>
                      <CardDescription className="mt-0.5 flex items-center gap-1.5 truncate text-xs">
                        <span className="truncate">{site.domain}</span>
                        <button
                          onClick={() => handleCopyDomain(site.id, site.domain)}
                          className="p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                          title="کپی دامنه"
                        >
                          {copiedId === site.id ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </CardDescription>
                    </div>
                  </div>

                  {/* منوی عملیات */}
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent
                      align="end"
                      className="w-44 text-right"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        <Globe className="ml-2 h-4 w-4" />
                        تنظیمات وبسایت
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="ml-2 h-4 w-4" />
                        تنظیمات ویجت
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Users className="ml-2 h-4 w-4" />
                        مدیریت اپراتورها
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          window.open(`https://${site.domain}`, "_blank")
                        }
                      >
                        <ExternalLink className="ml-2 h-4 w-4" />
                        مشاهده سایت
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              {/* بدنه و آمار سریع کارت */}
              <CardContent className="space-y-4 pt-1 pb-4">
                {/* برچسب‌های وضعیت و نقش */}
                <div className="flex flex-wrap items-center gap-2">
                  {site.role === "owner" ? (
                    <Badge
                      variant="outline"
                      className="gap-1 border-amber-500/20 bg-amber-500/10 text-xs font-normal text-amber-600 dark:text-amber-400"
                    >
                      <ShieldCheck className="h-3 w-3" />
                      مالک
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="gap-1 border-blue-500/20 bg-blue-500/10 text-xs font-normal text-blue-600 dark:text-blue-400"
                    >
                      <UserCheck className="h-3 w-3" />
                      اپراتور
                    </Badge>
                  )}

                  {site.status === "active" ? (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 border-emerald-500/20 bg-emerald-500/10 text-xs font-normal text-emerald-600 dark:text-emerald-400"
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      فعال
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-muted text-xs font-normal text-muted-foreground"
                    >
                      غیرفعال
                    </Badge>
                  )}
                </div>

                {/* آمارهای سایت */}
                <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-muted/40 p-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">اپراتورها:</span>
                    <span className="font-semibold">
                      {site.activeOperatorsCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">مکالمات:</span>
                    <span className="font-semibold">
                      {site.totalConversations}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>

            {/* فوتر کارت - دکمه‌های اقدام */}
            <CardFooter className="grid grid-cols-2 gap-2 border-t px-4 pt-4 pb-4">
              <Button
                variant="outline"
                size="lg"
                className="min-w-0 gap-1.5 text-xs"
              >
                <Settings className="size-3.5 shrink-0" />
                <span>مدیریت</span>
              </Button>

              <Button size="lg" className="min-w-0 gap-1.5 text-xs">
                <MessageSquare className="size-3.5 shrink-0" />
                <span>صندوق پیام‌ها</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
