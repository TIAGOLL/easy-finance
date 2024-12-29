import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { VscError } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { SignUpWithEmailAndPasswordService } from '@/services/sign-up-with-email-and-password.service'
import { signUpWithEmailAndPasswordSchema } from '@/forms/validations/sign-up-with-email-and-password'

type SignUpWithEmailAndPasswordSchema = z.infer<
	typeof signUpWithEmailAndPasswordSchema
>

export function useSignUp() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState<boolean>(false)

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<SignUpWithEmailAndPasswordSchema>({
		resolver: zodResolver(signUpWithEmailAndPasswordSchema),
	})

	async function signUpWithEmailAndPassword({
		name,
		email,
		password,
	}: SignUpWithEmailAndPasswordSchema) {
		setLoading(true)
		try {
			const { message } = await SignUpWithEmailAndPasswordService({
				name,
				email,
				password,
			})

			toast.success(message, {
				icon: IoMdCheckboxOutline,
			})
			navigate('/auth/sign-in')
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

	return { signUpWithEmailAndPassword, register, errors, handleSubmit, loading }
}
