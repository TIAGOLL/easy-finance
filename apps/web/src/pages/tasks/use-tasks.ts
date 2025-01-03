import { HTTPError } from 'ky'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
	const [searchParams] = useSearchParams()
	const [page, setPage] = useState<number>(Number(searchParams.get('page')))

	useEffect(() => {
		setPage(Number(searchParams.get('page')))
	}, [searchParams])

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
		page,
	}
}
