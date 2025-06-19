
import { CollectionColor } from '@/lib/constant/collectionColors'
import { z } from 'zod'

export const createCollectionSchema = z.object({
    name: z.string().min(4, {
        message: 'Collection name must be at least 4 characters'
    }),

    color: z.string().refine(color => Object.keys(CollectionColor).includes(color))
})

export type CreateCollectionSchemaType = z.infer<typeof createCollectionSchema>