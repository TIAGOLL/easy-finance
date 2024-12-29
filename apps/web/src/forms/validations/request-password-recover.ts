import { z } from 'zod'

export const requestPasswordRecoverSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido.' }).trim(),
})
