import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useForm } from 'react-hook-form'
import { MdOutlineAdd } from 'react-icons/md'
import { toast } from 'react-toastify'
import type { z } from 'zod'

import { FormMessageError } from '@/components/form-message-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { queryClient } from '@/lib/react-query'
import { cn } from '@/lib/utils'
import { CreateTaskService } from '@/services/create-task.service'

import { createTaskSchema } from './validations/create-task'

type CreateTaskSchema = z.infer<typeof createTaskSchema>

export function CreateTaskForm({ classname }: { classname?: string }) {
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<CreateTaskSchema>({
		resolver: zodResolver(createTaskSchema),
	})

	async function createTask(data: CreateTaskSchema) {
		try {
			const { message } = await CreateTaskService(data)

			if (message) {
				toast.success(message)
			}
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message)
			}
		} finally {
			reset()
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		}
	}

	return (
		<form
			onSubmit={handleSubmit(createTask)}
			className={cn('mb-4 flex flex-col justify-center gap-4', classname)}
		>
			<div className='grid w-full grid-cols-5 gap-2'>
				<Input
					placeholder='Adicionar nova tarefa'
					autoFocus
					{...register('title')}
					className='col-span-4 w-full'
				/>
				<Button className='col-span-1'>
					<MdOutlineAdd className='size-4' />
				</Button>
			</div>
			<FormMessageError error={errors.title?.message} />
		</form>
	)
}
