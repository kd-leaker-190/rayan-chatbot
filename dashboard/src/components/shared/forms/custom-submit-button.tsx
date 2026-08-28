import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface IProps {
  title: string
  size?:
    | "lg"
    | "default"
    | "xs"
    | "sm"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined
  classNames?: string
}

export default function CustomSubmitButton({
  title,
  size = "lg",
  classNames = "",
}: IProps) {
  return (
    <Button
      type="submit"
      size={size}
      className={cn(
        "h-12 w-full rounded-lg bg-brand text-base",
        classNames
      )}
    >
      {title}
    </Button>
  )
}
