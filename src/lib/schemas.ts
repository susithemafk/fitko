import { z } from "zod"

export const formSchema = z.object({
    privateOrPublic: z.array(z.enum(["private", "public"])),
    legpress: z.number().min(0).max(100).default(0).optional(),
    stairs: z.number().min(0).max(100).default(0).optional(),
    benchpress: z.number().min(0).max(100).default(0).optional(),
    email: z
        .string()
        .min(1, "Email je povinný pro zaslání slevy")
        .email("Zadej platný email"),
})

export type FormSchemaValues = z.infer<typeof formSchema>

export type FormSchemaPrivateOrPublic = z.infer<typeof formSchema>["privateOrPublic"][number]
