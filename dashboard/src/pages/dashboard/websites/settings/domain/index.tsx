import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useWebsite } from "@/hooks/use-website"
import { api, handleApiError } from "@/lib/api"
import {
  updateWebsiteSchema,
  type UpdateWebsiteSchema,
} from "@/schemas/website"

import {
  Globe,
  ArrowRight,
  Save,
  ExternalLink,
  ShieldCheck,
  Building2,
  Info,
  Trash2,
  AlertTriangle,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function WebsiteManagement() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { website, isLoading, isError, mutate } = useWebsite(id)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const {
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
    setError,
    register,
    reset,
  } = useForm<UpdateWebsiteSchema>({
    mode: "onChange",
    resolver: zodResolver(updateWebsiteSchema),
    defaultValues: {
      title: "",
      domain: "",
    },
  })

  useEffect(() => {
    if (website) {
      reset({
        title: website.title ?? "",
        domain: website.domain ?? "",
      })
    }
  }, [website, reset])

  const onSubmit = async (data: UpdateWebsiteSchema) => {
    try {
      const res = await api.put(`/websites/${id}`, data)
      toast.success(res.data.message || "اطلاعات وب‌سایت با موفقیت ویرایش شد")

      await mutate()

      navigate("/dashboard/websites")
    } catch (error) {
      handleApiError(error, setError, false)
    }
  }

  const handleDeleteWebsite = async () => {
    try {
      setIsDeleting(true)
      const res = await api.delete(`/websites/${id}`)
      toast.success(res.data.message || "وب‌سایت با موفقیت حذف شد")

      setIsDeleteDialogOpen(false)
      navigate("/dashboard/websites", { replace: true })
    } catch (error) {
      handleApiError(error, setError, false)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>

        <Card className="border bg-card/60">
          <CardHeader className="space-y-3 pb-6">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (isError || (!isLoading && !website)) {
    toast.error("وب‌سایت مورد نظر یافت نشد.")
    return <Navigate to="/dashboard/websites" replace />
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-border/70 shadow-sm"
            nativeButton={false}
            render={
              <Link to="/dashboard/websites">
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">
                تنظیمات {website?.title}
              </h1>

              <Badge
                variant="outline"
                className="gap-1 border-primary/20 bg-primary/10 text-xs font-normal text-primary"
              >
                <ShieldCheck className="h-3 w-3" />
                مالک
              </Badge>
            </div>

            <p className="mt-0.5 text-xs text-muted-foreground">
              شناسه سایت: #{website?.id} • دامنه: {website?.domain}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => window.open(`https://${website?.domain}`, "_blank")}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          مشاهده وب‌سایت
        </Button>
      </div>

      <Separator />

      <Card className="border bg-card/60 shadow-sm backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
              <Globe className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base font-semibold">
                اطلاعات پایه وب‌سایت
              </CardTitle>

              <CardDescription className="mt-1 text-xs leading-relaxed">
                عنوان و دامنه اصلی سایت را مشخص کنید. این اطلاعات در ابزارها و
                ویجت گفتگوی شما نمایش داده می‌شوند.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="update-website"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-medium">
                  عنوان وب‌سایت <span className="text-destructive">*</span>
                </Label>

                <div className="relative">
                  <Building2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...register("title")}
                    id="title"
                    type="text"
                    placeholder="مثال: فروشگاه دیجی‌استایل"
                    className="pr-9"
                  />
                </div>

                {errors.title && (
                  <p className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain" className="text-xs font-medium">
                  آدرس دامنه <span className="text-destructive">*</span>
                </Label>

                <div className="relative" dir="ltr">
                  <Globe className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...register("domain")}
                    id="domain"
                    type="text"
                    placeholder="example.com"
                    className="pl-9 font-mono text-sm"
                  />
                </div>

                {errors.domain && (
                  <p className="text-xs text-destructive">
                    {errors.domain.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-muted/40 p-3.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                توجه: در صورت تغییر دامنه، مطمئن شوید اسکریپت ویجت چت روی دامنه
                جدید نصب باشد تا اختلالی در ارتباط با کاربران رخ ندهد.
              </span>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => navigate("/dashboard/websites")}
            disabled={isSubmitting}
          >
            انصراف
          </Button>

          <Button
            type="submit"
            form="update-website"
            size="lg"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? (
              <>
                <Spinner className="h-4 w-4" />
                <span>در حال ذخیره...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>ذخیره تغییرات</span>
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border border-destructive/20 bg-destructive/5 shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle className="text-base font-semibold">
              حذف وبسایت
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            عملیات حذف غیرقابل بازگشت است. با حذف این وب‌سایت، تمام مکالمات،
            داده‌ها و دسترسی‌های متصل به آن برای همیشه پاک خواهند شد.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between border-t border-destructive/10 pt-4">
          <div className="text-xs text-muted-foreground">
            شناسه وب‌سایت جهت اطمینان:{" "}
            <span className="font-mono font-bold text-foreground">
              #{website?.id}
            </span>
          </div>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger
              render={
                <Button variant="destructive" size="lg" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>حذف وب‌سایت</span>
                </Button>
              }
            />

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  آیا از حذف این وب‌سایت اطمینان دارید؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-right text-xs leading-relaxed text-muted-foreground">
                  شما در حال حذف وب‌سایت{" "}
                  <strong className="text-foreground">{website?.title}</strong>{" "}
                  با دامنه{" "}
                  <strong className="font-mono text-foreground">
                    {website?.domain}
                  </strong>{" "}
                  هستید. این اقدام غیرقابل برگشت است.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="gap-2 sm:space-x-reverse">
                <AlertDialogCancel size="lg" disabled={isDeleting}>
                  انصراف
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault()
                    handleDeleteWebsite()
                  }}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  size="lg"
                >
                  {isDeleting ? (
                    <span className="flex items-center gap-2">
                      بله، حذف شود
                      <Spinner className="h-4 w-4" />
                    </span>
                  ) : (
                    <span>بله، حذف شود</span>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  )
}
