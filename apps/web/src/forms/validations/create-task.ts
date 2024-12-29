import { z } from 'zod'

export const createTaskSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'A tarefa deve conter no mínimo 3 caracteres.' }),
})
