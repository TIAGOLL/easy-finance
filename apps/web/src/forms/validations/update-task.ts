import { z } from 'zod'

export const updateTaskSchema = z.object({
	id: z.string(),
	title: z
		.string()
		.min(3, { message: 'A tarefa deve conter mais de 3 caracteres.' }),
})
