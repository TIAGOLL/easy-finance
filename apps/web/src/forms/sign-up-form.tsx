import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { LuKeyRound, LuUser, LuUserPlus } from 'react-icons/lu'
import { MdOutlineMailOutline } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { FormMessageError } from '@/components/form-message-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/ui/loader'
import { signUpWithEmailAndPasswordSchema } from '@/forms/validations/sign-up-with-email-and-password'
import { SignUpWithEmailAndPasswordService } from '@/services/sign-up-with-email-and-password.service'

type SignUpWithEmailAndPasswordSchema = z.infer<
	typeof signUpWithEmailAndPasswordSchema
>

export function SignUpForm() {
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

	return (
		<form
			onSubmit={handleSubmit(signUpWithEmailAndPassword)}
			className='space-y-4'
		>
			<div className='grid gap-2'>
				<Label htmlFor='name' className='flex place-items-center gap-2'>
					<LuUser className='size-4' />
					Nome
				</Label>
				<Input id='name' {...register('name')} autoComplete='off' autoFocus />
				<FormMessageError error={errors.name?.message} />
			</div>
			<div className='grid gap-2'>
				<Label htmlFor='email' className='flex place-items-center gap-2'>
					<MdOutlineMailOutline className='size-4' />
					E-mail
				</Label>
				<Input id='email' {...register('email')} autoComplete='off' />
				<FormMessageError error={errors.email?.message} />
			</div>
			<div className='grid gap-2'>
				<Label htmlFor='password' className='flex place-items-center gap-2'>
					<LuKeyRound className='size-4' />
					Senha
				</Label>
				<Input id='password' type='password' {...register('password')} />
				<FormMessageError error={errors.password?.message} />
			</div>
			<Button className='w-full' type='submit' disabled={loading}>
				Criar conta
				{loading && <Loader className='size-4 animate-spin' />}
				{!loading && <LuUserPlus className='size-4' />}
			</Button>
		</form>
	)
}
