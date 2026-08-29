import * as z from "zod"

export const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty({ error: "نام کاربری الزامی است." })
      .min(5, { error: "نام کاربری باید حداقل 5 حرف باشد" }),

    email: z.email({
      error: "فرمت ایمیل واردشده صحیح نمی باشد.",
    }),

    password: z.string().nonempty({ error: "رمزعبور الزامی می باشد." }),

    password_confirmation: z
      .string()
      .nonempty({ error: "تکرار رمزعبور الزامی می باشد." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "رمزعبور و تکرار رمزعبور یکسان نیستند.",
    path: ["password_confirmation"],
  })

export const loginSchema = z.object({
  email: z.email({ error: "فرمت ایمیل واردشده صحیح نمی باشد." }),

  password: z.string().nonempty({ error: "رمزعبور الزامی می باشد." }),

  remember: z.boolean().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "فرمت ایمیل واردشده صحیح نمی باشد." }),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().nonempty({ error: "مقدار توکن الزامی می باشد." }),

    email: z.email({ error: "فرمت ایمیل صحیح نمی باشد." }),

    password: z.string().nonempty({ error: "رمزعبور الزامی می باشد." }),

    password_confirmation: z
      .string()
      .nonempty({ error: "تکرار رمزعبور الزامی می باشد." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "رمزعبور و تکرار رمزعبور یکسان نیستند.",
    path: ["password_confirmation"],
  })

export type RegisterSchema = z.infer<typeof registerSchema>
export type LoginSchema = z.infer<typeof loginSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
