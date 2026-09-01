// React Imports
import { useState } from "react"

// Package Imports
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

// Utils Imports
import { cn } from "@/lib/utils"
import { api, handleApiError } from "@/lib/api"
import { registerSchema, type RegisterSchema } from "@/schemas/auth"
import { useAuth } from "@/hooks/use-auth"

// Icon Imports
import { Eye, EyeOff } from "lucide-react"

// Shadcn Components Imports
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

// Image Imports
import chatbotImage from "@/assets/images/chatbot.png"

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { mutate } = useAuth()

  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<RegisterSchema>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  })

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const res = await api.post("/register", data)

      toast.success(res.data.message)
      await mutate()
      navigate("/dashboard")
    } catch (error) {
      handleApiError(error, setError)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="px-6">
        <CardHeader className="flex flex-col items-start text-center">
          <Link
            to="/"
            className="flex items-start gap-2 self-start font-medium"
          >
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

          <CardTitle className="text-xl">ایجاد حساب کاربری</CardTitle>
          <CardDescription>
            به رایان چت بپیوندید و در عرض چندثانیه شروع کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">نام و نام خانوادگی</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="محمد ناصری"
                  className={cn("py-5")}
                  {...register("name")}
                />
                {errors.name && (
                  <FieldDescription
                    className={cn("text-red-500", "text-sm", "text-right")}
                  >
                    {errors.name.message}
                  </FieldDescription>
                )}
              </Field>
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
                    placeholder="یک رمزعبور قوی ایجاد کنید."
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
              <Field>
                <FieldLabel htmlFor="password_confirmation">
                  تکرار رمزعبور
                </FieldLabel>

                <Input
                  id="password_confirmation"
                  type={showPassword ? "text" : "password"}
                  placeholder="یک رمزعبور قوی ایجاد کنید."
                  className={cn("py-5")}
                  {...register("password_confirmation")}
                />
                {errors.password_confirmation && (
                  <FieldDescription
                    className={cn("text-red-500", "text-sm", "text-right")}
                  >
                    {errors.password_confirmation.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className={cn(
                    "h-12",
                    "w-full",
                    "rounded-lg",
                    "bg-brand",
                    "text-base"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      ایجاد حساب کاربری
                      <Spinner />
                    </span>
                  ) : (
                    <span>ایجاد حساب کاربری</span>
                  )}
                </Button>
                <FieldDescription className="text-center">
                  حساب کاربری دارید؟{" "}
                  <Link to="/login" className="text-brand">
                    ورود به حساب کاربری
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        با ثبت نام در رایان‌چت‌، شما با{" "}
        <Link to="/privacy-policy" className="text-brand underline">
          سیاست حریم خصوصی
        </Link>{" "}
        ما موافقت می‌کنید.
      </FieldDescription>
    </div>
  )
}
