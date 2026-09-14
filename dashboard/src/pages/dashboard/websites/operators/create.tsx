import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { api, handleApiError } from "@/lib/api"
import { useWebsite } from "@/hooks/use-website"

import {
  createOperatorSchema,
  type CreateOperatorSchema,
} from "@/schemas/operator"

import { ArrowRight, Mail, ShieldCheck } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRoleOptions } from "@/hooks/use-roles"

export default function CreateWebsiteOperatorPage() {
  const { id: websiteId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { website } = useWebsite(websiteId)
  const { roles } = useRoleOptions(websiteId)

  const mappedRoles: { label: string; value: number }[] = []

  roles.forEach((role) => {
    mappedRoles.push({ label: role.name, value: role.id })
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
    register,
    setError,
    reset,
    control,
  } = useForm<CreateOperatorSchema>({
    mode: "onChange",
    resolver: zodResolver(createOperatorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      role_id: undefined,
    },
  })

  const onSubmit = async (data: CreateOperatorSchema) => {
    try {
      const res = await api.post(
        `/websites/${websiteId}/operator-invitations/send`,
        data
      )
      toast.success(res.data.message || "نقش موردنظر شما با موفقیت ایجاد شد.")
      reset()
      navigate(`/dashboard/websites/${websiteId}/operators`)
    } catch (error) {
      handleApiError(error, setError)
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
                دعوت اوپراتور جدید
              </h1>
            </div>

            <p className="mt-0.5 text-xs text-muted-foreground">
              شناسه سایت: #{website?.id} • دامنه: {website?.domain}
            </p>
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
                اطلاعات اوپراتور
              </CardTitle>

              <CardDescription className="mt-1 text-xs leading-relaxed">
                اطلاعات اولیه برای ارسال ایمیل به اوپراتور را واردکنید، اوپراتور
                بعد از مشاهده ایمیل و تایید آن به وبسایت شما ملحق خواهد شد.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="send-operator-invitation-link"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-xs font-medium">
                  نام اوپراتور <span className="text-destructive">*</span>
                </Label>

                <Input
                  {...register("first_name")}
                  id="first_name"
                  type="text"
                  placeholder="شکیب"
                />

                {errors.first_name && (
                  <p className="text-xs text-destructive">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-xs font-medium">
                  نام خانوادگی اوپراتور{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <Input
                  {...register("last_name")}
                  id="last_name"
                  type="text"
                  placeholder="زیدی"
                />

                {errors.last_name && (
                  <p className="text-xs text-destructive">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium">
                  ایمیل دعوت{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="shakib@gmail.com"
                />

                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role_id" className="text-xs font-medium">
                  نقش اوپراتور <span className="text-destructive">*</span>
                </Label>

                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onValueChange={(value) => field.onChange(Number(value))}
                      items={mappedRoles.map((item) => ({
                        label: item.label,
                        value: String(item.value),
                      }))}
                    >
                      <SelectTrigger id="role_id" className="w-full">
                        <SelectValue placeholder="یک نقش برای اوپراتور انتخاب کنید." />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {mappedRoles.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={String(item.value)}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
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
            form="send-operator-invitation-link"
            size="lg"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? (
              <>
                <Spinner className="h-4 w-4" />
                <span>ارسال ایمیل دعوت</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                <span>ارسال ایمیل دعوت</span>
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
