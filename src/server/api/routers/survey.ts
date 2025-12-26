import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { formSchema } from "~/lib/schemas"
import { TRPCError } from "@trpc/server"

export const surveyRouter = createTRPCRouter({
    submit: publicProcedure.input(formSchema).mutation(async ({ ctx, input }) => {
        const existing = await ctx.db.surveyResponse.findUnique({
            where: { email: input.email },
        })

        if (existing) {
            throw new TRPCError({
                code: "CONFLICT",
                message: "Tento email už byl použit pro získání slevy.",
            })
        }

        return ctx.db.surveyResponse.create({
            data: {
                email: input.email,
                privateOrPublic: input.privateOrPublic,
                legpress: input.legpress ?? 0,
                stairs: input.stairs ?? 0,
                benchpress: input.benchpress ?? 0,
            },
        })
    }),
})
