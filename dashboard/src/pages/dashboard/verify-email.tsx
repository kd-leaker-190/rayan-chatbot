import { useState } from "react"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { useAuth } from "@/hooks/use-auth"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"

import chatbotImage from "@/assets/images/chatbot.png"

export default function VerifyEmail() {
  const { user, isEmailVerified } = useAuth()
  const [loading, setLoading] = useState(false)

  if (isEmailVerified) {
    return <Navigate to="/dashboard" replace />
  }

  const handleOpenEmailApp = () => {
    if (user?.email?.includes("gmail.com")) {
      window.open("https://mail.google.com", "_blank")
    } else {
      window.location.href = "mailto:"
    }
  }

  const handleResend = async () => {
    if (loading) return
    try {
      setLoading(true)
      const res = await api.post("/email/verification-notification")
      toast.success(
        res.data.message || "لینک تایید مجدداً به ایمیل شما ارسال شد."
      )
    } catch {
      toast.error("خطا در ارسال ایمیل.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4 antialiased">
      <div className="w-full max-w-md rounded-3xl border border-slate-100/80 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <div className="mb-8 flex items-center justify-center gap-2 md:justify-start">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted p-1.5">
            <img
              src={chatbotImage}
              alt="آیکون رایان چت"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">رایان چت</h1>
        </div>

        <div className="mb-6 text-right">
          <h1 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
            ایمیل خود را تایید کنید
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            ما یک لینک تایید به آدرس زیر ارسال کردیم:
            <span
              className="dir-ltr mt-1 block text-center font-semibold text-slate-700 bg-brand-soft p-2.5 rounded-md"
            >
              {user?.email || "you@example.com"}
            </span>
          </p>
        </div>

        <div className="my-8 flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <div className="relative flex h-24 w-28 flex-col items-center justify-end overflow-hidden rounded-2xl border border-brand-soft/50 bg-brand-soft/70 p-2 shadow-inner">
              <div className="absolute top-1 flex h-14 w-20 flex-col gap-1.5 rounded-lg bg-brand-soft/60 p-2 shadow-xs">
                <div className="h-1.5 w-full rounded-full bg-brand/60" />
                <div className="h-1.5 w-2/3 rounded-full bg-brand/60" />
              </div>
              <div className="z-10 h-10 w-full rounded-b-xl border-t border-brand-soft/40 bg-brand-soft/80" />
            </div>

            <div className="absolute -bottom-1 -left-1 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-lg ring-4 shadow-brand/30 ring-white z-10">
              <svg
                className="h-5 w-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>

        <Button
          onClick={handleOpenEmailApp}
          className="h-10 w-full rounded-xl bg-brand text-base font-semibold text-white shadow-md shadow-brand/20 transition-all active:scale-[0.99]"
        >
          باز کردن برنامه ایمیل
        </Button>

        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-500 sm:text-sm">
          <span>ایمیلی دریافت نکردید؟</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="inline-flex cursor-pointer items-center gap-1 font-bold text-brand transition-colors hover:text-brand-dark hover:underline disabled:opacity-50"
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>ارسال مجدد</span>
          </button>
        </div>
      </div>
    </div>
  )
}
