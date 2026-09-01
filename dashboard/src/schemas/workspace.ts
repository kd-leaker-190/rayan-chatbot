import * as z from "zod"

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .nonempty({ error: "نام میزکار الزامی است." })
    .min(5, { error: "نام میزکار باید حداقل 5 حرف باشد" }),

  bio: z.string().optional(),
})

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>
