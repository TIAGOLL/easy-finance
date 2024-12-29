import { api } from './api-client.service'

interface UpdateTaskResponse {
	message: string
}
interface UpdateTaskRequest {
	title: string
	id: string
}

export async function UpdateTaskService({ title, id }: UpdateTaskRequest) {
	const result = await api
		.put('tasks', {
			json: {
				title,
				id,
			},
		})
		.json<UpdateTaskResponse>()

	return result
}
