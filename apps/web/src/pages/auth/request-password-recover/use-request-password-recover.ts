import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { VscError } from 'react-icons/vsc'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { RequestPasswordRecoverService } from '@/services/request-password-recover.service'
import { requestPasswordRecoverSchema } from '@/forms/validations/request-password-recover'

type RequestPasswordRecoverSchema = z.infer<typeof requestPasswordRecoverSchema>

export function useRequestPasswordRecover() {
	const [loading, setLoading] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RequestPasswordRecoverSchema>({
		resolver: zodResolver(requestPasswordRecoverSchema),
	})

	async function requestPasswordRecover({
		email,
	}: RequestPasswordRecoverSchema) {
		setLoading(true)
		try {
			const { message } = await RequestPasswordRecoverService({
				email,
			})

			return toast.success(message)
		} catch (error) {
			if (error instanceof HTTPError) {
				const { message } = await error.response.json()

				return toast.error(message, {
					icon: VscError,
				})
			}
		} finally {
			setLoading(false)
		}
	}

	return {
		requestPasswordRecover,
		handleSubmit,
		register,
		errors,
		loading,
	}
}
