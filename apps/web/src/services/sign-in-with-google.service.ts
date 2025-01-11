import { api } from './api-client.service'

interface SignInWithGoogleRequest {
	accessToken: string
}

interface SignInWithGoogleResponse {
	token: string
	message: string
}

export async function SignInWithGoogleService({
	accessToken,
}: SignInWithGoogleRequest) {
	const result = await api
		.post('auth/google', {
			json: {
				accessToken,
			},
		})
		.json<SignInWithGoogleResponse>()

	return result
}
