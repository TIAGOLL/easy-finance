import { LuLogIn } from 'react-icons/lu'
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

export function ForgotPassword() {
	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
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
						<div className='grid gap-2'>
							<Label htmlFor='email' className='flex place-items-center gap-2'>
								<MdOutlineMailOutline className='size-4' />
								E-mail
							</Label>
							<Input id='email' type='email' required />
						</div>
						<Button
							type='submit'
							className='w-full'
							onClick={() => {
								toast({
									title: 'Um e-mail foi enviado para {email}',
									description: 'Recupere sua senha clicando no link do e-mail',
								})
							}}
						>
							Enviar e-mail
							<LuLogIn className='size-4' />
						</Button>
					</div>
					<div className='mt-4 text-center text-sm'>
						<NavLink to='/auth/signin' className='underline'>
							Ufa, lembrei minha senha
						</NavLink>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
