import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { MdOutlineDelete } from 'react-icons/md'

import { PaginationSection } from '@/components/pagination-section'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { UpdateTaskForm } from '@/forms/update-task-form'
import { queryClient } from '@/lib/react-query'
import { GetPendingTasks } from '@/services/get-pending-tasks.service'

import { LoadingTasks } from './loading-tasks'
import { useTasks } from './use-tasks'

export function PendingTasks() {
	const { deleteTask, finishTask, page } = useTasks()

	const { data, isLoading } = useQuery({
		queryKey: ['tasks', 'pending-tasks', page],
		queryFn: async () => await GetPendingTasks({ page }),
	})

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ['pending-tasks'] })
	}, [page])

	if (isLoading || !data) return <LoadingTasks />

	return (
		<Card className='flex flex-col items-center justify-center pt-5'>
			<CardContent className='grid min-h-[40rem] w-full min-w-[40rem] grid-cols-2 grid-rows-5 gap-4'>
				{data?.totalTasks <= 0 && (
					<p className='col-span-2 text-center text-sm text-muted-foreground'>
						Nenhuma atividade adicionada ainda.
					</p>
				)}

				{data.tasks.length > 0 &&
					data.tasks.map((task, index) => (
						<div
							key={index}
							className='col-span-1 flex max-h-[8rem] w-[20rem] flex-col items-center justify-between gap-2 rounded-md border p-2'
						>
							<span className='w-full overflow-hidden overflow-ellipsis'>
								{task.title}
							</span>
							<div className='flex gap-2'>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button size='sm'>
														<FaCheck className='size-4' />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Você realmente deseja finalizar essa tarefa?
														</AlertDialogTitle>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancelar</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => finishTask({ id: task.id })}
														>
															Finalizar
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</TooltipTrigger>
										<TooltipContent>Finalizar</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<UpdateTaskForm id={task.id} />
										</TooltipTrigger>
										<TooltipContent>Editar</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button variant='destructive' size='sm'>
														<MdOutlineDelete className='size-4' />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Você realmente deseja excluir essa tarefa?
														</AlertDialogTitle>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancelar</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => deleteTask({ id: task.id })}
														>
															Excluir
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</TooltipTrigger>
										<TooltipContent>Excluir</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					))}
				<div className='col-span-2 row-end-7 flex items-end justify-center'>
					<PaginationSection
						ItemsPerPage={10}
						totalItems={data?.totalTasks ?? 1}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
