import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuLoader } from 'react-icons/lu'
import { MdOutlineLock } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { z } from 'zod'

import { FormMessageError } from '@/components/form-message-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPasswordSchema } from '@/forms/validations/reset-password'
import { ResetPasswordService } from '@/services/reset-password.service'

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
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

	return (
		<form onSubmit={handleSubmit(resetPassword)} className='grid gap-6'>
			<div className='grid gap-2'>
				<Label htmlFor='password' className='flex place-items-center gap-2'>
					<MdOutlineLock className='size-4' />
					Nova senha
				</Label>
				<Input
					id='password'
					type='password'
					{...register('password')}
					autoComplete='off'
				/>
				<FormMessageError error={errors.password?.message} />
			</div>

			<div className='grid gap-2'>
				<Label
					htmlFor='confirmPassword'
					className='flex place-items-center gap-2'
				>
					<MdOutlineLock className='size-4' />
					Confirme a nova senha
				</Label>
				<Input
					id='confirmPassword'
					type='password'
					{...register('confirmPassword')}
					autoComplete='off'
				/>
				<FormMessageError error={errors.confirmPassword?.message} />
			</div>

			<Button disabled={loading} type='submit' className='w-full'>
				Redefinir senha
				{loading && <LuLoader className='size-4 animate-spin' />}
			</Button>
		</form>
	)
}
