import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'

export function SignInWithGoogleForm() {
	const [loading, setLoading] = useState<boolean>(false)

	function SignInWithGoogle(e) {
		e.preventDefault()
		setLoading(true)
	}

	return (
		<form onSubmit={SignInWithGoogle}>
			<Button disabled={loading} variant='outline' className='w-full'>
				{!loading && <FcGoogle className='size-4' />}
				{loading && <Loader className='size-4' />}
				Logar com Google
			</Button>
		</form>
	)
}
