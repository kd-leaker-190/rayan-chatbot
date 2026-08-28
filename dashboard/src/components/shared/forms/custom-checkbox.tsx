import { Checkbox } from "@/components/ui/checkbox"
import { FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

interface IProps {
  label: string
  name: string
  containerClassNames?: string
  labelClassNames?: string
  checkboxClassNames?: string
}

export default function CustomCheckbox({
  label,
  name,
  containerClassNames = "",
  labelClassNames = "",
  checkboxClassNames = "",
}: IProps) {
  return (
    <div className={cn("flex items-center gap-2", containerClassNames)}>
      <Checkbox
        id={name}
        name={name}
        className={cn("rounded", checkboxClassNames)}
      />
      <FieldLabel
        htmlFor={name}
        className={cn("cursor-pointer text-sm", labelClassNames)}
      >
        {label}
      </FieldLabel>
    </div>
  )
}
