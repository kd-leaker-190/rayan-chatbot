import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Mail } from "lucide-react"

import { api, handleApiError } from "@/lib/api"
import type { IApiResponse } from "@/contracts/api"
import { forgotPasswordSchema, type ForgotPasswordSchema } from "@/schemas/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"

import chatbotImage from "@/assets/images/chatbot.png"

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: ForgotPasswordSchema) => {
    try {
      const res = await api.post<IApiResponse<null>>("/forgot-password", values)
      toast.success(
        res.data.message || "لینک بازیابی رمز عبور به ایمیل شما ارسال شد."
      )
    } catch (error) {
      handleApiError(error, setError)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
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
          <h1 className="mb-2 text-xl font-semibold tracking-tight text-slate-900">
            رمز عبور خود را فراموش کرده‌اید؟
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            نگران نباشید! آدرس ایمیل خود را وارد کنید تا لینک بازیابی را برایتان
            ارسال کنیم.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2 text-right">
            <Label
              htmlFor="email"
              className="text-xs font-semibold text-slate-700"
            >
              آدرس ایمیل
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                dir="ltr"
                placeholder="you@example.com"
                className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-left placeholder:text-slate-400 focus-visible:ring-brand"
                {...register("email")}
              />
              <Mail className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-rose-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 w-full rounded-xl bg-brand text-base font-semibold text-white shadow-md shadow-emerald-500/20 transition-all active:scale-[0.99]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                ارسال لینک بازیابی
                <Spinner />
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                ارسال لینک بازیابی
              </span>
            )}
          </Button>
        </form>

        {/* دکمه بازگشت به صفحه ورود */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-500 transition-colors hover:text-emerald-600 sm:text-sm"
          >
            بازگشت به صفحه ورود
          </Link>
        </div>
      </div>
    </div>
  )
}
