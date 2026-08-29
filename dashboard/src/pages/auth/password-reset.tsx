import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Eye, EyeOff } from "lucide-react"

import { api, handleApiError } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"
import { cn } from "@/lib/utils"
import { resetPasswordSchema, type ResetPasswordSchema } from "@/schemas/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

import chatbotImage from "@/assets/images/chatbot.png"

export default function PasswordReset() {
  const params = useParams<{ token?: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // گرفتن توکن هم از Path Param و هم از Query Param (جهت پوشش هر دو حالت)
  const token = params.token || searchParams.get("token") || ""
  const email = searchParams.get("email") || ""

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    mode: "onSubmit",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
      email: email,
      password: "",
      password_confirmation: "",
    },
  })

  // اطمینان از قرار گرفتن قطعی مقادیر در Form State
  useEffect(() => {
    if (token) setValue("token", token, { shouldValidate: true })
    if (email) setValue("email", email, { shouldValidate: true })
  }, [token, email, setValue])

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const res = await api.post<IApiResponse<null>>("/reset-password", data)

      toast.success(
        res.data.message || "رمز عبور با موفقیت تغییر یافت. اکنون وارد شوید."
      )
      navigate("/login", { replace: true })
    } catch (err) {
      handleApiError(err, setError)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-muted p-4"
      dir="rtl"
    >
      <div className="w-full max-w-100 rounded-3xl border border-slate-100/80 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <Link to="/" className="flex items-start gap-2 self-start font-medium">
          <div className="my-3 flex items-center justify-center gap-2 md:justify-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 p-1.5">
              <img
                src={chatbotImage}
                alt="آیکون رایان چت"
                className="h-full w-full object-contain"
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">رایان چت</h1>
          </div>
        </Link>

        <div className="mb-6 text-right">
          <h1 className="mb-2 text-lg font-semibold tracking-tight text-slate-900">
            تعیین رمز عبور جدید
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            رمز عبور جدید خود را در کادرهای زیر وارد کنید.
          </p>
        </div>

        {/* هشدار در صورتی که توکن در URL موجود نباشد */}
        {!token && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-right text-xs leading-5 text-amber-800">
            توکن بازیابی رمز عبور یافت نشد. لطفاً روی لینکی که به ایمیلتان ارسال
            شده کلیک کنید.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* مقداردهی مستقیم به value فیلدهای hidden */}
          <input type="hidden" value={token} {...register("token")} />
          <input type="hidden" value={email} {...register("email")} />

          <Field>
            <FieldLabel htmlFor="password">رمز عبور</FieldLabel>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="یک رمز عبور قوی ایجاد کنید."
                className={cn(
                  "h-11 rounded-xl bg-slate-50/50 pr-3.5 pl-10 text-right focus-visible:ring-emerald-500"
                )}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-emerald-600"
                tabIndex={-1}
                aria-label={
                  showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <FieldDescription
                className={cn("text-red-500", "text-xs", "mt-1 text-right")}
              >
                {errors.password.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password_confirmation">
              تکرار رمز عبور
            </FieldLabel>

            <div className="relative">
              <Input
                id="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="رمز عبور را مجدداً وارد کنید."
                className={cn(
                  "h-11 rounded-xl bg-slate-50/50 pr-3.5 pl-10 text-right focus-visible:ring-emerald-500"
                )}
                {...register("password_confirmation")}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-emerald-600"
                tabIndex={-1}
                aria-label={
                  showConfirmPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.password_confirmation && (
              <FieldDescription
                className={cn("text-red-500", "text-xs", "mt-1 text-right")}
              >
                {errors.password_confirmation.message}
              </FieldDescription>
            )}
          </Field>

          {(errors.token || errors.email) && (
            <div className="rounded-lg bg-rose-50 p-2.5 text-right text-xs text-rose-600">
              {errors.token?.message ||
                errors.email?.message ||
                "اطلاعات لینک نامعتبر است."}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || !token}
              className="h-12 w-full rounded-xl bg-emerald-500 text-base font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  تغییر رمز عبور
                  <Spinner />
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  تغییر رمز عبور
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
