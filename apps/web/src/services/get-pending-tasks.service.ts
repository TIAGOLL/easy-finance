import { api } from './api-client.service'

interface TasksResponse {
	tasks: {
		id: string
		title: string
		created_at: string
		updated_at: string
		user_id: string
	}[]
	totalTasks: number
}

interface TasksRequest {
	page: number
}

export async function GetPendingTasks({ page }: TasksRequest) {
	const result = await api
		.get(`pending-tasks?page=${page || 1}`)
		.json<TasksResponse>()

	return result
}
