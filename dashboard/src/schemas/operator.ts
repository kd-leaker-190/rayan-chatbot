import * as z from "zod"

export const createOperatorSchema = z.object({
  role_id: z.number().min(1, { error: "انتخاب یک نقش الزامی است." }),
  first_name: z.string().nonempty({ error: "نام الزامی است." }),
  last_name: z.string().nonempty({ error: "نام خانوادگی الزامی است." }),
  email: z.email({ error: "ایمیل واردشده صحیح نمی باشد." }),
})

export const updateOperatorSchema = z.object({
  status: z.enum(["active", "inactive", "suspended"], {
    error: "وضعیت اوپراتور باید یکی از موراد فعال، غیرفعال، مسدودشده باشد.",
  }),

  role_id: z
    .number()
    .int("شناسه نقش نامعتبر است.")
    .positive("لطفاً یک نقش انتخاب کنید."),
})

export type CreateOperatorSchema = z.infer<typeof createOperatorSchema>
export type UpdateOperatorSchema = z.infer<typeof updateOperatorSchema>
