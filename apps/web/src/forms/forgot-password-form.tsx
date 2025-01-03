import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuLoader, LuLogIn } from 'react-icons/lu'
import { MdOutlineMailOutline } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'
import { toast } from 'react-toastify'
import type { z } from 'zod'

import { FormMessageError } from '@/components/form-message-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { requestPasswordRecoverSchema } from '@/forms/validations/request-password-recover'
import { RequestPasswordRecoverService } from '@/services/request-password-recover.service'

type RequestPasswordRecoverSchema = z.infer<typeof requestPasswordRecoverSchema>

export function ForgotPasswordForm() {
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

	return (
		<form
			onSubmit={handleSubmit(requestPasswordRecover)}
			className='grid gap-6'
		>
			<div className='grid gap-2'>
				<Label htmlFor='email' className='flex place-items-center gap-2'>
					<MdOutlineMailOutline className='size-4' />
					E-mail
				</Label>
				<Input id='email' {...register('email')} autoFocus autoComplete='off' />
				<FormMessageError error={errors.email?.message} />
			</div>
			<Button type='submit' className='w-full' disabled={loading}>
				Enviar e-mail
				{loading && <LuLoader className='size-4 animate-spin' />}
				{!loading && <LuLogIn className='size-4' />}
			</Button>
		</form>
	)
}
