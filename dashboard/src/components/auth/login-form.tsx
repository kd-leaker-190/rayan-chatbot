// Package Imports
import { Link } from "react-router-dom"

// Util Imports
import { cn } from "@/lib/utils"

// Shadcn Components Imports
import { Card, CardContent } from "@/components/ui/card"
import { FieldDescription, FieldGroup } from "@/components/ui/field"

// Custom Component Imports
import CustomInput from "@/components/shared/forms/custom-input"
import VisiblePasswordInput from "@/components/shared/forms/visible-password-input"
import CustomCheckbox from "@/components/shared/forms/custom-checkbox"
import CustomSubmitButton from "@/components/shared/forms/custom-submit-button"
import RayanLoginTitle from "@/components/auth/rayan-login-title"
import LoginWelocmeText from "@/components/auth/login-welcome-text"

// Images Imports
import loginPageImage from "@/assets/images/login-page.png"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center p-4 sm:p-6",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-270">
        <Card className="overflow-hidden rounded-[24px] border border-gray-200 bg-white p-0 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
          <CardContent className="flex min-h-0 flex-col-reverse p-0 md:min-h-157.5 md:flex-row">
            <form className="flex w-full flex-col justify-center bg-white px-6 py-8 sm:px-10 md:w-1/2 md:px-12 lg:px-14">
              <RayanLoginTitle />

              <FieldGroup className="gap-5">
                <LoginWelocmeText />

                <CustomInput
                  label="ایمیل"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  dir="ltr"
                />

                <VisiblePasswordInput
                  label="رمزعبور"
                  name="password"
                  placeholder="رمزعبور خود را وارد کنید."
                />

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <CustomCheckbox label="من را بخاطر بسپار" name="remember" />

                  <Link
                    to="/forgot-password"
                    className="text-brand hover:underline"
                  >
                    فراموشی رمز عبور؟
                  </Link>
                </div>

                <CustomSubmitButton title="ورود به حساب کاربری" />

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

        <p className="mt-5 text-center text-xs leading-6 text-muted-foreground">
          با ورود به سایت، شما با{" "}
          <Link to="/privacy" className="underline text-brand">
            سیاست حریم خصوصی
          </Link>{" "}
          ما موافقت می‌کنید.
        </p>
      </div>
    </div>
  )
}
