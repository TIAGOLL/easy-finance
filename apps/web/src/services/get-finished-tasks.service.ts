import { api } from './api-client.service'

interface Task {
	id: string
	title: string
	created_at: string
	updated_at: string
	user_id: string
}

interface TasksResponse {
	tasks: Task[]
}

export async function GetFinishedTasks() {
	const result = await api.get('finished-tasks?page=1').json<TasksResponse>()

	return result
}
