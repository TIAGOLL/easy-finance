import ky from 'ky'
import nookies from 'nookies'

export const api = ky.create({
	prefixUrl: process.env.API_URL,
	hooks: {
		beforeRequest: [
			async (request) => {
				const cookies = nookies.get()
				const token = cookies.token

				if (token) {
					// Adiciona o token ao cabeçalho de autorização
					request.headers.set('Authorization', `Bearer ${token}`)
				}
			},
		],
	},
})
