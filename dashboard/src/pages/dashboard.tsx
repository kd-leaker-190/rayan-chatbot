import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import {
  createWorkspaceSchema,
  type CreateWorkspaceSchema,
} from "@/schemas/workspace"
import { api, handleApiError } from "@/lib/api"

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
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

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
  const { user, mutate } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateWorkspace = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsModalOpen(true)
    }, 1000)
  }

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    register,
  } = useForm<CreateWorkspaceSchema>({
    mode: "onChange",
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      title: "",
      domain: "",
    },
  })

  const onSubmit = async (data: CreateWorkspaceSchema) => {
    try {
      const res = await api.post("api/v1/websites", data)
      await mutate()
      setIsModalOpen(false)
      toast.success(res.data.message)
    } catch (error) {
      handleApiError(error, setError)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-3">
          <h1 className="text-xl font-bold sm:text-2xl">داشبورد</h1>
          <p className="text-sm text-muted-foreground">
            {user?.first_name + " " + user?.last_name} عزیز به رایان‌چت خوش
            آمدید 👋
          </p>

          {user?.owned_websites.length === 0 && (
            <>
              <Separator />
              <p className="text-sm text-muted-foreground">
                هنوز وبسایتی ندارید، برای شروع کار با رایان چت اطلاعات وبسایت
                خود را تکمیل کنید.
              </p>
              <Button
                size="lg"
                className={cn("py-2")}
                onClick={handleCreateWorkspace}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span>ساخت اولین وبسایت</span>
                    <Spinner />
                  </>
                ) : (
                  <span>ساخت اولین وبسایت</span>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {user?.owned_websites?.length === 0 && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-106.25 [&>button]:right-auto [&>button]:left-4">
            <DialogHeader>
              <DialogTitle>ایجاد وبسایت جدید</DialogTitle>
              <DialogDescription>
                مشخصات وبسایت خود را وارد کنید تا راه‌اندازی اولیه انجام شود.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              id="create-workspace"
              className="space-y-4 py-4"
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">عنوان وبسایت</FieldLabel>
                  <Input
                    id="title"
                    type="text"
                    placeholder="وبسایت رایان فناوری"
                    className={cn("py-5")}
                    {...register("title")}
                  />
                  {errors.title && (
                    <FieldDescription
                      className={cn("text-red-500", "text-sm", "text-right")}
                    >
                      {errors.title.message}
                    </FieldDescription>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="domain">آدرس وبسایت</FieldLabel>
                  <Input
                    id="domain"
                    type="text"
                    placeholder="rayanfanavari.ir"
                    className={cn("py-5")}
                    {...register("domain")}
                  />
                  {errors.domain && (
                    <FieldDescription
                      className={cn("text-red-500", "text-sm", "text-right")}
                    >
                      {errors.domain.message}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className={cn("py-4")}
                >
                  انصراف
                </Button>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  form="create-workspace"
                  className={cn("py-4")}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      ایجاد وبسایت
                      <Spinner />
                    </span>
                  ) : (
                    <span>ایجاد وبسایت</span>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {user?.owned_websites && user?.owned_websites?.length > 0 && (
        <>
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
                      <p className="text-sm leading-none font-medium">
                        {c.name}
                      </p>
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
        </>
      )}
    </div>
  )
}
