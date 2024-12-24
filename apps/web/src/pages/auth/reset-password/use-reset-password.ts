import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { VscError } from 'react-icons/vsc'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { z } from 'zod'

import { ResetPasswordService } from '@/services/reset-password.service'
import { resetPasswordSchema } from '@/validations/forms/reset-password'

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export function useResetPassword() {
	const navigate = useNavigate()
	const { token } = useParams()

	const [loading, setLoading] = useState<boolean>(false)

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			token,
		},
	})

	async function resetPassword({ token, password }: ResetPasswordSchema) {
		setLoading(true)

		try {
			const { message } = await ResetPasswordService({ token, password })
			toast.success(message)
			return navigate('/auth/sign-in')
		} catch (error) {
			if (error instanceof HTTPError) {
				const { message } = await error.response.json()

				return toast.error(message, {
					icon: VscError,
				})
			}
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return { resetPassword, errors, register, handleSubmit, loading }
}
