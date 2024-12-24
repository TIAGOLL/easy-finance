import nookies from 'nookies'
import { redirect } from 'react-router-dom'

import { getProfile } from '@/services/get-profile.service'

export function isAuthenticated() {
	return !!nookies.get(null, 'token')?.value
}

export async function auth() {
	const token = nookies.get(null, 'token')?.value

	if (!token) {
		redirect('/auth/sign-in')
	}

	try {
		const user = await getProfile()

		return user
	} catch {
		nookies.destroy(null, 'token')
	}

	redirect('/auth/sign-in')
}
