// React Imports
import { useState } from "react"

// Package Imports
import { Link, useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

// Utils Imports
import { cn } from "@/lib/utils"
import { api, handleApiError } from "@/lib/api"
import { loginSchema, type LoginSchema } from "@/schemas/auth"
import { useAuth } from "@/hooks/use-auth"

// Icon Imports
import { Eye, EyeOff } from "lucide-react"

// Shadcn Components Imports
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

// Images Imports
import chatbotImage from "@/assets/images/chatbot.png"
import loginPageImage from "@/assets/images/login-page.png"

export default function LoginForm({ className }: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { mutate } = useAuth()

  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchema>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await api.post("/login", data)

      toast.success(res.data.message)
      await mutate()
      navigate("/dashboard")
    } catch (error) {
      handleApiError(error, setError, false)
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center p-4 sm:p-6",
        className
      )}
    >
      <div className="w-full max-w-270">
        <Card className="overflow-hidden rounded-[24px] border border-gray-200 bg-white p-0 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
          <CardContent className="flex min-h-0 flex-col-reverse p-0 md:min-h-157.5 md:flex-row">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col justify-center bg-white px-6 py-8 sm:px-10 md:w-1/2 md:px-12 lg:px-14"
            >
              <div className="mb-8 flex items-center justify-center gap-2 md:justify-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 p-1.5">
                  <img
                    src={chatbotImage}
                    alt="آیکون رایان چت"
                    className="h-full w-full object-contain"
                  />
                </div>

                <h1 className="text-2xl font-bold text-gray-900">رایان چت</h1>
              </div>

              <FieldGroup className="gap-5">
                <div className="mb-2 flex flex-col items-start gap-1 text-right">
                  <h2 className="text-xl font-bold text-gray-900">
                    خوش آمدید 👋
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    وارد حساب کاربری خود شوید و مدیریت چت‌ها را شروع کنید.
                  </p>
                </div>

                <Field>
                  <FieldLabel htmlFor="email">ایمیل</FieldLabel>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={cn("py-5")}
                    dir="ltr"
                    {...register("email")}
                  />

                  {errors.email && (
                    <FieldDescription
                      className={cn("text-red-500", "text-sm", "text-right")}
                    >
                      {errors.email.message}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">رمزعبور</FieldLabel>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمزعبور خود را وارد کنید."
                      className={cn("py-5")}
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-emerald-600"
                      aria-label={
                        showPassword ? "مخفی کردن رمزعبور" : "نمایش رمزعبور"
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
                      className={cn("text-red-500", "text-sm", "text-right")}
                    >
                      {errors.password.message}
                    </FieldDescription>
                  )}
                </Field>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <div className={cn("flex", "items-center", "gap-2")}>
                    <Controller
                      name="remember"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Checkbox
                            id="remember"
                            name="remember"
                            className={cn("rounded")}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel
                            htmlFor="remember"
                            className={cn("cursor-pointer", "text-sm")}
                          >
                            من را بخاطر بسپار
                          </FieldLabel>
                        </>
                      )}
                    />
                  </div>

                  <Link
                    to="/forgot-password"
                    className="text-brand hover:underline"
                  >
                    فراموشی رمز عبور؟
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className={cn(
                    "h-10",
                    "w-full",
                    "rounded-lg",
                    "bg-brand",
                    "text-base"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      ورود به حساب کاربری
                      <Spinner />
                    </span>
                  ) : (
                    <span>ورود به حساب کاربری</span>
                  )}
                </Button>

                <FieldDescription className="pt-1 text-center text-sm">
                  حساب کاربری ندارید؟{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-brand hover:underline"
                  >
                    ایجاد حساب کاربری
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>

            <div className="relative hidden min-h-90 w-full overflow-hidden bg-emerald-950 md:block md:min-h-0 md:w-1/2">
              <img
                src={loginPageImage}
                alt="تصویر رایان چت"
                className="absolute inset-0 block h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
