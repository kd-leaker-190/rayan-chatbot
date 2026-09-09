import * as z from "zod"

export const createRoleSchema = z.object({
  name: z.string().min(3, { error: "نام دسترسی الزامی است." }),
  description: z.string().optional(),
  permission_ids: z
    .number()
    .array()
    .min(1, { error: "حداقل باید یک دسترسی انتخاب کنید." }),
})

export type CreateRoleSchema = z.infer<typeof createRoleSchema>
