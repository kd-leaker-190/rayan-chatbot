import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { api, handleApiError } from "@/lib/api"
import { usePermissions, useRole } from "@/hooks/use-roles"
import { useWebsite } from "@/hooks/use-website"

import { updateRoleSchema, type UpdateRoleSchema } from "@/schemas/roles"

import { ArrowRight, Save, ShieldCheck, Text } from "lucide-react"

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
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { useEffect } from "react"

export default function EditWebsiteRolePage() {
  const { id: websiteId, roleId } = useParams<{ id: string; roleId: string }>()
  const navigate = useNavigate()

  const { permissions, isLoading: isPermissionLoading } = usePermissions()
  const { website, isLoading: isWebsiteLoading } = useWebsite(websiteId)
  const { role } = useRole(websiteId, roleId)

  const {
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
    register,
    setError,
    control,
    reset,
  } = useForm<UpdateRoleSchema>({
    mode: "onChange",
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      name: role?.name,
      description: role?.description,
      permission_ids: [],
    },
  })

  const onSubmit = async (data: UpdateRoleSchema) => {
    try {
      const res = await api.put(`/websites/${websiteId}/roles/${roleId}`, data)
      toast.success(res.data.message || "نقش موردنظر شما با موفقیت ویرایش شد.")
      reset()
      navigate(`/dashboard/websites/${websiteId}/roles`)
    } catch (error) {
      handleApiError(error, setError)
    }
  }

  useEffect(() => {
    if (role) {
      reset({
        name: role.name || "",
        description: role.description || "",
        permission_ids: role.permissions
          ? role.permissions.map((p) => p.id)
          : [],
      })
    }
  }, [role, reset])

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
              <Link to={`/dashboard/websites/${websiteId}/roles`}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">
                ایجاد دسترسی جدید
              </h1>
            </div>

            {isWebsiteLoading && <Spinner className="h-4 w-4 mt-2 text-brand" />}
            {!isWebsiteLoading && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                شناسه سایت: #{website?.id} • دامنه: {website?.domain}
              </p>
            )}
          </div>
        </div>
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
                نام دسترسی موردنظر را به همراه یک توضیح مختصر (اختیاری) وارد
                کنید و در ادامه دسترسی های موردنیاز به داشبورد را انتخاب کنید.
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
                <Label htmlFor="name" className="text-xs font-medium">
                  نام دسترسی <span className="text-destructive">*</span>
                </Label>

                <div className="relative">
                  <ShieldCheck className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="مدیریت وبسایت‌ها"
                    className="pr-9"
                  />
                </div>

                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-medium">
                  توضیح دسترسی (اختیاری)
                </Label>

                <div className="relative">
                  <Text className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...register("description")}
                    id="description"
                    type="text"
                    placeholder="اجازه دسترسی به بخش وبسایت‌ها"
                    className="pr-9"
                  />
                </div>

                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                )}
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
                  <Controller
                    control={control}
                    name="permission_ids"
                    render={({ field }) => (
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={field.value?.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          const current = field.value || []
                          if (checked) {
                            field.onChange([...current, permission.id])
                          } else {
                            field.onChange(
                              current.filter(
                                (id: number) => id !== permission.id
                              )
                            )
                          }
                        }}
                      />
                    )}
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
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => navigate(`/dashboard/websites/${websiteId}/roles`)}
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
                <span>ذخیره اطلاعات</span>
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
    </div>
  )
}
