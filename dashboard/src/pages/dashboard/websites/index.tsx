import { useState } from "react"

import useSWR from "swr"

import { fetcher } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"

import {
  Globe,
  ExternalLink,
  Settings,
  MessageSquare,
  Users,
  Plus,
  MoreVertical,
  ShieldCheck,
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
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import CreateWebsiteDialog from "@/components/dashboard/widgets/create-website-dialog"

export default function Websites() {
  const { data, isLoading } = useSWR<IApiResponse<IWebsite[]>>(
    "/api/v1/websites",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopyDomain = (id: number, domain: string) => {
    navigator.clipboard.writeText(domain)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">وب‌سایت‌ها</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            این قسمت مربوط به مدیریت وبسایت‌هایی می‌باشد که شما مالک آن هستید یا
            دسترسی اپراتور به آن را دارید.
          </p>
        </div>

        <CreateWebsiteDialog />
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between border bg-card/60"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2.5">
                      <Skeleton className="size-10 shrink-0 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="size-8 shrink-0 rounded-md" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-1 pb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-muted/40 p-2.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </div>

              <CardFooter className="grid grid-cols-2 gap-2 border-t px-4 pt-4 pb-4">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </CardFooter>
            </Card>
          ))}

        {!isLoading &&
          data?.data.map((website) => (
            <Card
              key={website.id}
              className="group relative flex flex-col justify-between border bg-card/60 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="truncate text-base font-bold transition-colors group-hover:text-primary">
                          {website.title}
                        </CardTitle>
                        <CardDescription className="mt-0.5 flex items-center gap-1.5 truncate text-xs">
                          <span className="truncate">{website.domain}</span>
                          <button
                            onClick={() =>
                              handleCopyDomain(website.id, website.domain)
                            }
                            className="p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                            title="کپی دامنه"
                          >
                            {copiedId === website.id ? (
                              <Check className="h-3 w-3 text-emerald-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </CardDescription>
                      </div>
                    </div>

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
                            window.open(`https://${website.domain}`, "_blank")
                          }
                        >
                          <ExternalLink className="ml-2 h-4 w-4" />
                          مشاهده سایت
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-1 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="gap-1 border-amber-500/20 bg-amber-500/10 text-xs font-normal text-amber-600 dark:text-amber-400"
                    >
                      <ShieldCheck className="h-3 w-3" />
                      مالک
                    </Badge>

                    {website.status === "active" ? (
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

                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/50 bg-muted/40 p-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">اپراتورها:</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">مکالمات:</span>
                      <span className="font-semibold">0</span>
                    </div>
                  </div>
                </CardContent>
              </div>

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
                  <span>پنل گفتگو</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      {!isLoading && data?.data?.length === 0 && (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-muted p-4">
            <Globe className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold">
            هیچ وب‌سایتی یافت نشد
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            هنوز وب‌سایتی اضافه نکرده‌اید. با کلیک بر روی دکمه زیر اولین وب‌سایت
            خود را ایجاد کنید.
          </p>
          <Button className="mt-4 gap-2" size="sm">
            <Plus className="h-4 w-4" />
            افزودن وب‌سایت جدید
          </Button>
        </Card>
      )}
    </div>
  )
}
