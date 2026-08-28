import * as z from "zod"

export const loginSchema = z.object({
  email: z.email({ error: "فرمت ایمیل واردشده صحیح نمی باشد." }),

  password: z.string().nonempty({ error: "رمزعبور الزامی می باشد." }),

  remember: z.boolean().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>
