import { api } from './api-client.service'

interface RequestPasswordRecoverRequest {
	email: string
}

interface RequestPasswordRecoverResponse {
	message: string
}

export async function RequestPasswordRecoverService({
	email,
}: RequestPasswordRecoverRequest) {
	const result = await api
		.post('auth/request-recover-password', {
			json: {
				email,
			},
		})
		.json<RequestPasswordRecoverResponse>()

	return result
}
