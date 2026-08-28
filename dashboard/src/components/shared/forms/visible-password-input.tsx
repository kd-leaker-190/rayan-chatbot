import { useState } from "react"

import { Eye, EyeOff } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface IProps {
  label: string
  name: string
  placeholder?: string
  classNames?: string
  dir?: string
}

export default function VisiblePasswordInput({
  label,
  name,
  placeholder = "",
  classNames = "",
  dir = "rtl",
}: IProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={cn('py-5', classNames)}
          dir={dir}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-emerald-600"
          aria-label={showPassword ? "مخفی کردن رمزعبور" : "نمایش رمزعبور"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </Field>
  )
}
