import { z, infer } from "zod";


export const createTaskSchema = z.object({
    collectionId: z.number().nonnegative(),
    content: z.string().min(8, {
        message: "Task content must be atleast 8 characters"
    }),
    expiresAt: z.date().optional()

})

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;