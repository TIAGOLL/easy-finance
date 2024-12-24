import { api } from './api-client.service'

interface ResetPasswordRequest {
	token: string
	password: string
}

interface ResetPasswordResponse {
	message: string
}

export async function ResetPasswordService({
	token,
	password,
}: ResetPasswordRequest) {
	const result = await api
		.post('auth/reset-password', {
			json: {
				token,
				password,
			},
		})
		.json<ResetPasswordResponse>()

	return result
}
