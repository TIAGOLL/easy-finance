import { api } from './api-client.service'

interface getProfileResponse {
	created_at: string
	email: string
	email_verified: boolean
	updated_at: string
	name: string
	id: string
}

export async function getProfile() {
	const result = await api
		.get('sessions/get-profile')
		.json<getProfileResponse>()

	return result
}
