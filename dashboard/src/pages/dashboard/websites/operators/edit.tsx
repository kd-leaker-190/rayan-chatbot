import { useEffect } from "react"

import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { api, handleApiError } from "@/lib/api"
import { useWebsite } from "@/hooks/use-website"
import { useRoleOptions } from "@/hooks/use-roles"
import { useOperator } from "@/hooks/use-operators"

import {
  updateOperatorSchema,
  type UpdateOperatorSchema,
} from "@/schemas/operator"

import { ArrowRight, Save, ShieldCheck } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

export default function EditWebsiteOperatorPage() {
  const { id: websiteId, operatorId } = useParams<{
    id: string
    operatorId: string
  }>()
  const navigate = useNavigate()

  const { website, isLoading: isWebsiteLoading } = useWebsite(websiteId)
  const { operator } = useOperator(websiteId, operatorId)
  const { roles } = useRoleOptions(websiteId)

  const {
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
    setError,
    reset,
    control,
  } = useForm<UpdateOperatorSchema>({
    mode: "onChange",
    resolver: zodResolver(updateOperatorSchema),
    defaultValues: {
      status: "active",
      role_id: undefined,
    },
  })

  useEffect(() => {
    if (!operator || !roles.length) return

    reset({
      status: operator.status,
      role_id: operator.role?.id ?? undefined,
    })
  }, [operator, roles, reset])

  const onSubmit = async (data: UpdateOperatorSchema) => {
    try {
      const res = await api.put(
        `/websites/${websiteId}/operators/${operatorId}`,
        data
      )
      toast.success(
        res.data.message || "اوپراتور موردنظر شما با موفقیت ویرایش شد."
      )
      reset()
      navigate(`/dashboard/websites/${websiteId}/operators`)
    } catch (error) {
      handleApiError(error, setError)
    }
  }

  const operatorStatus = [
    { label: "فعال", value: "active" },
    { label: "غیرفعال", value: "inactive" },
    { label: "مسدودشده", value: "suspended" },
  ]

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
                ویرایش اطلاعات اوپراتور
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
                وضیعت اوپراتور به همراه یک نقش را انتخاب کنید.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="update-operator"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-medium">وضعیت اوپراتور</Label>

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => {
                    const selectedStatus = operatorStatus.find(
                      (status) => status.value === field.value
                    )

                    return (
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          {selectedStatus?.label || "نقش را انتخاب کنید"}
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {operatorStatus.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )
                  }}
                />

                {errors.status && (
                  <p className="text-xs text-destructive">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium">
                  دسترسی اوپراتور
                </Label>

                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => {
                    const selectedRole = roles.find(
                      (role) => role.id === field.value
                    )

                    return (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-full">
                          {selectedRole?.name || "نقش را انتخاب کنید"}
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={String(role.id)}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )
                  }}
                />

                {errors.role_id && (
                  <p className="text-xs text-destructive">
                    {errors.role_id.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() =>
              navigate(`/dashboard/websites/${websiteId}/operators`)
            }
            disabled={isSubmitting}
          >
            انصراف
          </Button>

          <Button
            type="submit"
            form="update-operator"
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
