import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getProfile } from '@/services/get-profile.service'
import { getTasks } from '@/services/get-tasks.service'
import { tasksSchema } from '@/validations/forms/create-task'

type deleteTaskSchema = {
	id: string
}

type updateTaskSchema = {
	id: string
	name: string
}

type TasksSchema = z.infer<typeof tasksSchema>

export function useTaks() {
	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm({
		resolver: zodResolver(tasksSchema),
	})

	const { data, isLoading } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => getTasks(),
	})

	async function createTask({ name }: TasksSchema) {}
	async function deleteTask({ id }: deleteTaskSchema) {}
	async function updateTask({ id, name }: updateTaskSchema) {}

	return {
		errors,
		handleSubmit,
		register,
		createTask,
		deleteTask,
		updateTask,
		isLoading,
		data,
	}
}
