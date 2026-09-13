import * as z from "zod"

export const updateOperatorSchema = z.object({
  status: z.enum(["active", "inactive", "suspended"], {
    error: "وضعیت اوپراتور باید یکی از موراد فعال، غیرفعال، مسدودشده باشد.",
  }),

  role_id: z
    .number()
    .int("شناسه نقش نامعتبر است.")
    .positive("لطفاً یک نقش انتخاب کنید."),
})

export type UpdateOperatorSchema = z.infer<typeof updateOperatorSchema>
