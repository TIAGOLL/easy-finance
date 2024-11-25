import { FcGoogle } from 'react-icons/fc'
import { LuKeyRound, LuLogIn } from 'react-icons/lu'
import { MdOutlineMailOutline } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

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
import { toast } from '@/hooks/use-toast'

export function SignIn() {
	return (
		<div className='flex h-screen w-full place-items-center px-4'>
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
					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='email' className='flex place-items-center gap-2'>
								<MdOutlineMailOutline className='size-4' />
								E-mail
							</Label>
							<Input id='email' type='email' required />
						</div>
						<div className='grid gap-2'>
							<div className='flex items-center'>
								<Label
									htmlFor='password'
									className='flex place-items-center gap-2'
								>
									<LuKeyRound className='size-4' />
									Senha
								</Label>
							</div>
							<Input id='password' type='password' required />
						</div>
						<Button
							type='submit'
							className='w-full'
							onClick={() => {
								toast({
									title: 'Aguarde, ainda estamos em desenvolvimento',
									description: 'Começo do projeto: 20/10/2024',
								})
							}}
						>
							Logar
							<LuLogIn className='size-4' />
						</Button>
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
						<Button variant='outline' className='w-full'>
							<FcGoogle className='size-4' />
							Logar com Google
						</Button>
					</div>
					<div className='mt-8 flex items-center justify-around text-center text-sm'>
						<NavLink to='/auth/signup' className='underline'>
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
