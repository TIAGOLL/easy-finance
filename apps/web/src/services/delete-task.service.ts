import { api } from './api-client.service'

interface DeleteTaskRequest {
	id: string
}

interface DeleteTaskResponse {
	message: string
}

export async function DeleteTaskService({ id }: DeleteTaskRequest) {
	const result = await api
		.delete('tasks', {
			json: {
				id,
			},
		})
		.json<DeleteTaskResponse>()

	return result
}
