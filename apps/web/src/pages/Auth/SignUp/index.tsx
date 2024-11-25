import { FcGoogle } from 'react-icons/fc'
import { LuKeyRound, LuUserPlus } from 'react-icons/lu'
import { MdOutlineMailOutline } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

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

export function SignUp() {
	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
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
							<Button variant='outline'>
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
							<Label htmlFor='email' className='flex place-items-center gap-2'>
								<MdOutlineMailOutline className='size-4' />
								E-mail
							</Label>
							<Input id='email' type='email' />
						</div>
						<div className='grid gap-2'>
							<Label
								htmlFor='password'
								className='flex place-items-center gap-2'
							>
								<LuKeyRound className='size-4' />
								Senha
							</Label>
							<Input id='password' type='password' />
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button className='w-full'>
						Criar conta
						<LuUserPlus className='size-4' />
					</Button>
				</CardFooter>
				<div className='flex items-center justify-around p-4 text-center text-sm'>
					<NavLink to='/auth/signin' className='underline'>
						Já possuo uma conta
					</NavLink>
				</div>
			</Card>
		</div>
	)
}
