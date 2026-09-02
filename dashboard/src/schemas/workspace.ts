import * as z from "zod"

const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/

export const createWorkspaceSchema = z.object({
  title: z.string().min(1, "نام وبسایت الزامی است."),
  domain: z
    .string()
    .min(1, "آدرس وبسایت الزامی است.")
    .transform((val) => {
      let clean = val.trim().toLowerCase()
      clean = clean.replace(/^https?:\/\/(www\.)?/i, "")
      clean = clean.split("/")[0]
      return clean
    })
    .pipe(
      z
        .string()
        .regex(domainRegex, "فرمت دامنه نامعتبر است. (مثال: rayanfanavari.ir)")
    ),
})

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>
