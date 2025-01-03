import { FcGoogle } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'

import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { SignUpForm } from '@/forms/sign-up-form'

export function SignUp() {
	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
			<div className='absolute bottom-32 left-32'>
				<ThemeSwitcher />
			</div>
			<Card>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl'>Cadastro de conta</CardTitle>
					<CardDescription>
						Insira seu e-mail e senha abaixo para criar sua conta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='grid grid-cols-1 gap-6'>
							<Button variant='outline' type='button'>
								<FcGoogle />
								Google
							</Button>
						</div>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-background px-2 text-muted-foreground'>
									Ou continue com
								</span>
							</div>
						</div>
						<SignUpForm />
					</div>
				</CardContent>
				<CardFooter>
					<div className='flex w-full items-center justify-center p-4 text-center text-sm'>
						<NavLink to='/auth/sign-in' className='underline'>
							Já possuo uma conta
						</NavLink>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
