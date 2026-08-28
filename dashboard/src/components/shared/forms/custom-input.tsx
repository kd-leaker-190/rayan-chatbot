import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface IProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  classNames?: string
  dir?: string
}

export default function CustomInput({
  label,
  name,
  type = "text",
  placeholder = "",
  classNames = "",
  dir = "rtl",
}: IProps) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        className={cn('py-5', classNames)}
        dir={dir}
      />
    </Field>
  )
}
