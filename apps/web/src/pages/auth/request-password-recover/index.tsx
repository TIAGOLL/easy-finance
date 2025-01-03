import { NavLink } from 'react-router-dom'

import { ThemeSwitcher } from '@/components/theme-switcher'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ForgotPasswordForm } from '@/forms/forgot-password-form'

export function ForgotPassword() {
	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
			<div className='absolute bottom-32 left-32'>
				<ThemeSwitcher />
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
						<ForgotPasswordForm />
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
