import { useGoogleLogin } from '@react-oauth/google'
import { HTTPError } from 'ky'
import nookies from 'nookies'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { VscError } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { SignInWithGoogleService } from '@/services/sign-in-with-google.service'

export function SignInWithGoogleForm() {
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()

	const SignInWithGoogle = useGoogleLogin({
		onSuccess: async (res) => {
			try {
				const { message, token } = await SignInWithGoogleService({
					accessToken: res.access_token,
				})

				if (token) {
					nookies.set(null, 'token', token, { maxAge: 60 * 60 * 24, path: '/' })
					toast.success(message, {
						icon: IoMdCheckboxOutline,
					})
					navigate('/tasks')
				}
			} catch (error) {
				if (error instanceof HTTPError) {
					const { message } = await error.response.json()

					return toast.error(message, {
						icon: VscError,
					})
				}
			} finally {
				setLoading(false)
			}
		},
		onError(error) {
			console.log(error)
			setLoading(false)
		},
		error_callback: () => setLoading(false),
		onNonOAuthError: () => setLoading(false),
	})

	return (
		<Button
			disabled={loading}
			variant='outline'
			className='w-full'
			onClick={() => {
				setLoading(true)
				SignInWithGoogle()
			}}
		>
			{!loading && <FcGoogle className='size-4' />}
			{loading && <Loader className='size-4' />}
			Logar com Google
		</Button>
	)
}
