import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { isAuthenticated } from '@/auth/auth'

export function Private({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const navigate = useNavigate()

	useEffect(() => {
		setInterval(() => {
			if (!isAuthenticated()) {
				navigate('/auth/sign-in', { replace: true })
			}
		}, 10000)
	}, [navigate])

	return <>{children}</>
}
