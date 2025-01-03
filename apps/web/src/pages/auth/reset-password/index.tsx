import { ThemeSwitcher } from '@/components/theme-switcher'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ResetPasswordForm } from '@/forms/reset-password-form'

export function ResetPassword() {
	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
			<div className='absolute bottom-32 left-32'>
				<ThemeSwitcher />
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
						<ResetPasswordForm />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
