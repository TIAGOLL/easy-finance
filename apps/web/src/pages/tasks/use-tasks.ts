import { HTTPError } from 'ky'
import { toast } from 'react-toastify'

import { queryClient } from '@/lib/react-query'
import { DeleteTaskService } from '@/services/delete-task.service'
import { FinishTaskService } from '@/services/finish-task.service'

type deleteTaskSchema = {
	id: string
}
type finishTaskSchema = {
	id: string
}

export function useTasks() {
	async function deleteTask({ id }: deleteTaskSchema) {
		try {
			const { message } = await DeleteTaskService({ id })

			if (message) {
				toast.info(message)
			}
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message)
			}
		} finally {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		}
	}

	async function finishTask({ id }: finishTaskSchema) {
		try {
			const { message } = await FinishTaskService({ id })

			if (message) {
				toast.success(message)
			}
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message)
			}
		} finally {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		}
	}

	return {
		deleteTask,
		finishTask,
	}
}
