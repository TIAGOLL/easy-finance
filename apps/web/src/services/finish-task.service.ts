import { api } from './api-client.service'

interface finishTaskResponse {
	message: string
}

interface finishTaskRequest {
	id: string
}

export async function FinishTaskService({ id }: finishTaskRequest) {
	const result = await api
		.patch('tasks', {
			json: {
				id,
			},
		})
		.json<finishTaskResponse>()

	return result
}
