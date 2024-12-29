import { z } from 'zod'

export const resetPasswordSchema = z
	.object({
		token: z.string().trim(),
		password: z
			.string()
			.min(6, 'A senha deve conter no minímo 6 caracteres.')
			.trim(),
		confirmPassword: z.string(),
	})
	.refine((fields) => fields.password === fields.confirmPassword, {
		path: ['confirmPassword'],
		message: 'As senhas precisam ser iguais.',
	})
