import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuPencil } from 'react-icons/lu'
import { PiReadCvLogo } from 'react-icons/pi'
import { toast } from 'react-toastify'
import type { z } from 'zod'

import { FormMessageError } from '@/components/form-message-error'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/react-query'
import { UpdateTaskService } from '@/services/update-task.service'

import { updateTaskSchema } from './validations/update-task'

type UpdateTasksSchema = z.infer<typeof updateTaskSchema>

export function UpdateTaskForm({ id }: { id: string }) {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false)

	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<UpdateTasksSchema>({
		resolver: zodResolver(updateTaskSchema),
		defaultValues: {
			id,
		},
	})

	useEffect(() => {
		reset()
	}, [dialogOpen, reset])

	async function updateTask({ id, title }: UpdateTasksSchema) {
		try {
			const { message } = await UpdateTaskService({ id, title })

			toast.success(message)
			setDialogOpen(false)
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message)
			}
		}
	}

	return (
		<AlertDialog open={dialogOpen}>
			<AlertDialogTrigger>
				<Button variant='outline' size='sm' onClick={() => setDialogOpen(true)}>
					<LuPencil className='size-4' />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Editar tarefa</AlertDialogTitle>
				</AlertDialogHeader>
				<form onSubmit={handleSubmit(updateTask)} className='grid-4 gap-4'>
					<div className='grid gap-2'>
						<Label htmlFor='title' className='flex place-items-center gap-2'>
							<PiReadCvLogo className='size-4' />
							Título
						</Label>
						<Input
							autoFocus
							id='title'
							{...register('title')}
							autoComplete='off'
						/>
						<FormMessageError error={errors.title?.message} />
					</div>
					<AlertDialogFooter className='mt-5'>
						<AlertDialogCancel onClick={() => setDialogOpen(false)}>
							Cancelar
						</AlertDialogCancel>
						<Button type='submit'>Salvar</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
