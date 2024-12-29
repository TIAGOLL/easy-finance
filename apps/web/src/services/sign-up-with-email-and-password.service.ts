import { api } from './api-client.service'

interface SignUpWithEmailAndPasswordRequest {
	name: string
	email: string
	password: string
}

interface SignUpWithEmailAndPasswordResponse {
	message: string
}

export async function SignUpWithEmailAndPasswordService({
	name,
	email,
	password,
}: SignUpWithEmailAndPasswordRequest) {
	const res = await api
		.post('accounts', {
			json: {
				name,
				email,
				password,
			},
		})
		.json<SignUpWithEmailAndPasswordResponse>()

	return res
}
