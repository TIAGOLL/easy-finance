import { api } from './api-client.service'

interface createTaskResponse {
	message: string
}
interface createTaskRequest {
	title: string
}

export async function CreateTaskService({ title }: createTaskRequest) {
	const result = await api
		.post('tasks', {
			json: {
				title,
			},
		})
		.json<createTaskResponse>()

	return result
}
