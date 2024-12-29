import nookies from 'nookies'

export function isAuthenticated() {
	const token = nookies.get(null, 'token')
	if (Object.keys(token).length === 0 || !token) {
		return false
	}

	return true
}
