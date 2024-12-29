import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import nookies from 'nookies'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { VscError } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { SignInWithEmailAndPasswordService } from '@/services/sign-in-with-email-and-password.service'
import { signInWithEmailAndPasswordSchema } from '@/forms/validations/sign-in-with-email-and-password'

type SignInWithEmailAndPasswordSchema = z.infer<
	typeof signInWithEmailAndPasswordSchema
>

export function useSignIn() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInWithEmailAndPasswordSchema>({
		resolver: zodResolver(signInWithEmailAndPasswordSchema),
	})

	async function signInWithEmailAndPassword({
		email,
		password,
	}: SignInWithEmailAndPasswordSchema) {
		setLoading(true)
		try {
			const { token, message } = await SignInWithEmailAndPasswordService({
				email,
				password,
			})

			if (token) {
				nookies.set(null, 'token', token, { maxAge: 60 * 60 * 24, path: '/' })
				toast.success(message, {
					icon: IoMdCheckboxOutline,
				})
				navigate('/tasks')
			}
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

	function signInWithGoogle() {}

	return {
		signInWithEmailAndPassword,
		signInWithGoogle,
		handleSubmit,
		register,
		errors,
		loading,
	}
}
