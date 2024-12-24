import { useState } from 'react'
import { MdOutlineAdd, MdOutlineDelete } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

import { useTaks } from './use-tasks'

export function Tasks() {
	const {
		handleSubmit,
		errors,
		createTask,
		deleteTask,
		getTasks,
		register,
		updateTask,
		data,
		isLoading,
	} = useTaks()

	if (isLoading) {
		return <div></div>
	}

	return (
		<div className='flex h-screen w-full flex-col place-items-center px-4 py-8'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl'>Minhas Atividades</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='mb-4 grid gap-4'>
						<div className='flex gap-2'>
							<Input placeholder='Adicionar nova tarefa' />
							<Button>
								<MdOutlineAdd className='size-4' />
							</Button>
						</div>
					</div>
					<ul className='grid gap-2'>
						{data && data.tasks && data.tasks.length > 0 ? (
							data?.tasks?.map((task, index) => (
								<li
									key={index}
									className='flex items-center justify-between rounded-md border p-2'
								>
									<span>{task.name}</span>
									<Button variant='outline' size='sm'>
										<MdOutlineDelete className='size-4' />
									</Button>
								</li>
							))
						) : (
							<p className='text-center text-sm text-muted-foreground'>
								Nenhuma atividade adicionada ainda.
							</p>
						)}
					</ul>
				</CardContent>
			</Card>
		</div>
	)
}
