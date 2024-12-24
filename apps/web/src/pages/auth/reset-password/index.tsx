import { LuLoader } from 'react-icons/lu'
import { MdOutlineLock } from 'react-icons/md'

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

import { useResetPassword } from './use-reset-password'

export function ResetPassword() {
	const { resetPassword, errors, handleSubmit, loading, register } =
		useResetPassword()

	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
			<div className='absolute bottom-32 left-32'>
				<ModeToggle />
			</div>
			<Card className='mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Redefinição de senha</CardTitle>
					<CardDescription>
						Digite sua nova senha abaixo para redefini-la
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<form onSubmit={handleSubmit(resetPassword)} className='grid gap-6'>
							<div className='grid gap-2'>
								<Label
									htmlFor='password'
									className='flex place-items-center gap-2'
								>
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
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
