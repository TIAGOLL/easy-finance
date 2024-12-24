import { z } from 'zod'

export const tasksSchema = z.object({
	name: z.string().min(3),
})
