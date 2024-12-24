import { api } from './api-client.service'

interface Task {
	id: string
	name: string
	created_at: string
	updated_at: string
	user_id: string
}

interface TasksResponse {
	tasks: Task[]
}

export async function getTasks() {
	const result = await api.get('tasks?page=1').json<TasksResponse>()

	return result
}
