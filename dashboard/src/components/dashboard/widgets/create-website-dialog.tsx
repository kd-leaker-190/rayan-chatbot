import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

import { handleApiError } from "@/lib/api"
import { useWebsite } from "@/hooks/use-website"

import {
  createWorkspaceSchema,
  type CreateWorkspaceSchema,
} from "@/schemas/workspace"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

export default function CreateWebsiteDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { createWebsite, isCreating } = useWebsite()

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    reset,
  } = useForm<CreateWorkspaceSchema>({
    mode: "onChange",
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      title: "",
      domain: "",
    },
  })

  const onSubmit = async (data: CreateWorkspaceSchema) => {
    try {
      const response = await createWebsite(data)

      reset()
      setIsModalOpen(false)

      toast.success(response.message || "وب‌سایت با موفقیت ایجاد شد")
    } catch (error) {
      handleApiError(error, setError)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger
        render={
          <Button size="lg" className="mt-2">
            ساخت وب‌سایت
          </Button>
        }
      />

      <DialogContent className="sm:max-w-106.25 [&>button]:right-auto [&>button]:left-4">
        <DialogHeader>
          <DialogTitle>ایجاد وب‌سایت جدید</DialogTitle>
          <DialogDescription>
            مشخصات وب‌سایت خود را وارد کنید تا راه‌اندازی اولیه انجام شود.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">عنوان وب‌سایت</FieldLabel>

              <Input
                id="title"
                type="text"
                placeholder="وب‌سایت رایان فناوری"
                className="py-5"
                {...register("title")}
              />

              {errors.title && (
                <FieldDescription className="text-right text-sm text-red-500">
                  {errors.title.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="domain">آدرس وب‌سایت</FieldLabel>

              <Input
                id="domain"
                type="text"
                placeholder="rayanfanavari.ir"
                className="py-5"
                {...register("domain")}
              />

              {errors.domain && (
                <FieldDescription className="text-right text-sm text-red-500">
                  {errors.domain.message}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="py-4"
            >
              انصراف
            </Button>

            <Button disabled={isCreating} type="submit" className="py-4">
              {isCreating ? (
                <span className="flex items-center gap-2">
                  ایجاد وب‌سایت
                  <Spinner />
                </span>
              ) : (
                "ایجاد وب‌سایت"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
