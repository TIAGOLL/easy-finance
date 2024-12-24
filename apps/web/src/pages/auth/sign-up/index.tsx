import { FcGoogle } from 'react-icons/fc'
import { LuKeyRound, LuLoader, LuUser, LuUserPlus } from 'react-icons/lu'
import { MdOutlineMailOutline } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import { FormMessageError } from '@/components/form-message-error'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useSignUp } from './use-sign-up'

export function SignUp() {
	const {
		handleSubmit,
		errors,
		register,
		signUpWithEmailAndPassword,
		loading,
	} = useSignUp()

	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
			<div className='absolute bottom-32 left-32'>
				<ModeToggle />
			</div>
			<Card>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl'>Cadastro de conta</CardTitle>
					<CardDescription>
						Insira seu e-mail e senha abaixo para criar sua conta
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit(signUpWithEmailAndPassword)}>
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
							<div className='grid gap-2'>
								<Label htmlFor='name' className='flex place-items-center gap-2'>
									<LuUser className='size-4' />
									Nome
								</Label>
								<Input
									id='name'
									{...register('name')}
									autoComplete='off'
									autoFocus
								/>
								<FormMessageError error={errors.name?.message} />
							</div>
							<div className='grid gap-2'>
								<Label
									htmlFor='email'
									className='flex place-items-center gap-2'
								>
									<MdOutlineMailOutline className='size-4' />
									E-mail
								</Label>
								<Input id='email' {...register('email')} autoComplete='off' />
								<FormMessageError error={errors.email?.message} />
							</div>
							<div className='grid gap-2'>
								<Label
									htmlFor='password'
									className='flex place-items-center gap-2'
								>
									<LuKeyRound className='size-4' />
									Senha
								</Label>
								<Input
									id='password'
									type='password'
									{...register('password')}
								/>
								<FormMessageError error={errors.password?.message} />
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button className='w-full' type='submit' disabled={loading}>
							Criar conta
							{loading ? (
								<LuLoader className='size-4 animate-spin' />
							) : (
								<LuUserPlus className='size-4' />
							)}
						</Button>
					</CardFooter>
				</form>
				<div className='flex items-center justify-around p-4 text-center text-sm'>
					<NavLink to='/auth/sign-in' className='underline'>
						Já possuo uma conta
					</NavLink>
				</div>
			</Card>
		</div>
	)
}
