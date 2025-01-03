import { LuKeyRound } from 'react-icons/lu'
import { NavLink } from 'react-router-dom'

import { ThemeSwitcher } from '@/components/theme-switcher'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { SignInWithEmailAndPasswordForm } from '@/forms/sign-in-with-email-and-password-form'
import { SignInWithGoogleForm } from '@/forms/sign-in-with-google-form'

export function SignIn() {
	return (
		<div className='flex h-screen w-full place-items-center px-4'>
			<div className='absolute bottom-32 left-32'>
				<ThemeSwitcher />
			</div>
			<Card className='mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='flex place-items-center gap-2 text-2xl'>
						<LuKeyRound />
						Autenticação
					</CardTitle>
					<CardDescription>
						Insira seu e-mail e senha abaixo para fazer login em sua conta!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SignInWithEmailAndPasswordForm />
					<div className='relative my-4'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-background px-2 text-muted-foreground'>
								Ou continue com
							</span>
						</div>
					</div>
					<SignInWithGoogleForm />
					<div className='mt-8 flex items-center justify-around text-center text-sm'>
						<NavLink to='/auth/sign-up' className='underline'>
							Não possuo conta
						</NavLink>
						<NavLink
							to='/auth/forgot-password'
							className='ml-auto inline-block text-sm underline'
						>
							Esqueci minha senha
						</NavLink>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
