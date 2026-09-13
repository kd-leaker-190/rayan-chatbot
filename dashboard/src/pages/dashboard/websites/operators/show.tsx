import { Link, useNavigate, useParams } from "react-router-dom"

import { usePermissions, useRole } from "@/hooks/use-roles"
import { useWebsite } from "@/hooks/use-website"

import { ArrowRight, ShieldCheck } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
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
import { api } from "@/lib/api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useState } from "react"

export default function ShowWebsiteOperatorPage() {
  const { id: websiteId, roleId } = useParams<{ id: string; roleId: string }>()
  const navigate = useNavigate()

  const { permissions, isLoading: isPermissionLoading } = usePermissions()
  const { website, isLoading: isWebsiteLoading } = useWebsite(websiteId)
  const { role } = useRole(websiteId, roleId)

  const [deleting, setDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDeleteRole = async () => {
    setDeleting(true)

    try {
      const res = await api.delete(`/websites/${websiteId}/roles/${roleId}`)
      toast.success(res.data.message)
      setDeleting(false)
      setIsDialogOpen(false)
      navigate(`/dashboard/websites/${websiteId}/roles`)
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsDialogOpen(true)
        setDeleting(false)
        toast.error(error.response?.data.message)
        return
      }
    }
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
              <Link to={`/dashboard/websites/${websiteId}/operators`}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">
                اطلاعات دسترسی
              </h1>
            </div>

            {isWebsiteLoading && (
              <Spinner className="mt-2 h-4 w-4 text-brand" />
            )}
            {!isWebsiteLoading && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                شناسه سایت: #{website?.id} • دامنه: {website?.domain}
              </p>
            )}
          </div>
        </div>

        {role?.website && (
          <AlertDialog open={isDialogOpen}>
            <AlertDialogTrigger
              onClick={() => setIsDialogOpen(!isDialogOpen)}
              render={
                <Button
                  variant="destructive"
                  className="rounded-lg border-border/70 shadow-sm"
                />
              }
            >
              حذف دسترسی
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  آیا از این اقدام مطمئن هستید؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-right">
                  دسترسی پاک شده قابل بازگشت نمی باشد، لطفا اگر اطلاعات مهمی
                  مرتبط با این دسترسی دارید در حذف دقت کنید.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction
                  disabled={deleting}
                  onClick={handleDeleteRole}
                  variant="destructive"
                >
                  {deleting ? (
                    <span className="flex items-center gap-2">
                      بله حذف کن
                      <Spinner />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">بله حذف کن</span>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Separator />

      <Card className="border bg-card/60 shadow-sm backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <CardTitle className="text-base font-semibold">
                اطلاعات دسترسی
              </CardTitle>

              <CardDescription className="mt-1 text-xs leading-relaxed">
                در این قسمت نقش ها و دسترسی های مربوطه را مشاهده می کنید.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium">
                  نام دسترسی
                </Label>

                <p className="text-xs text-secondary-foreground">
                  {role?.name}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-medium">
                  توضیح دسترسی
                </Label>

                <p className="text-xs text-secondary-foreground">
                  {role?.description}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {isPermissionLoading && (
                <Spinner className="h-4 w-4 text-brand" />
              )}
              {permissions.map((permission) => (
                <Field
                  orientation="horizontal"
                  key={permission.id}
                  className="flex min-w-0 cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    id={`permission-${permission.id}`}
                    disabled={true}
                    checked={
                      role?.permissions?.some((p) => p.id === permission.id) ??
                      false
                    }
                  />
                  <FieldLabel
                    htmlFor={`permission-${permission.id}`}
                    className="cursor-pointer truncate text-xs font-normal select-none"
                    title={permission.name}
                  >
                    {permission.name}
                  </FieldLabel>
                </Field>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => navigate(`/dashboard/websites/${websiteId}/operators`)}
          >
            بازگشت
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
