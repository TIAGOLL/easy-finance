import { LuLoader, LuLogIn } from 'react-icons/lu'
import { MdOutlineMailOutline } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import { FormMessageError } from '@/components/form-message-error'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useRequestPasswordRecover } from './use-request-password-recover'

export function ForgotPassword() {
	const { requestPasswordRecover, errors, handleSubmit, loading, register } =
		useRequestPasswordRecover()

	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
			<div className='absolute bottom-32 left-32'>
				<ModeToggle />
			</div>
			<Card className='mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Recuperação de senha</CardTitle>
					<CardDescription>
						Insira seu e-mail abaixo para receber instruções de redefinição de
						senha
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<form
							onSubmit={handleSubmit(requestPasswordRecover)}
							className='grid gap-6'
						>
							<div className='grid gap-2'>
								<Label
									htmlFor='email'
									className='flex place-items-center gap-2'
								>
									<MdOutlineMailOutline className='size-4' />
									E-mail
								</Label>
								<Input
									id='email'
									{...register('email')}
									autoFocus
									autoComplete='off'
								/>
								<FormMessageError error={errors.email?.message} />
							</div>
							<Button type='submit' className='w-full' disabled={loading}>
								Enviar e-mail
								{loading ? (
									<LuLoader className='size-4 animate-spin' />
								) : (
									<LuLogIn className='size-4' />
								)}
							</Button>
						</form>
					</div>
					<div className='mt-4 text-center text-sm'>
						<NavLink to='/auth/sign-in' className='underline'>
							Ufa, lembrei minha senha
						</NavLink>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
