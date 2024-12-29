import { useQuery } from '@tanstack/react-query'
import { FaCheck } from 'react-icons/fa6'
import { MdOutlineDelete } from 'react-icons/md'

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
import { GetPendingTasks } from '@/services/get-pending-tasks.service'

import { useTasks } from './use-tasks'

export function PendingTasks() {
	const { deleteTask, finishTask } = useTasks()

	const { data, isLoading } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => GetPendingTasks(),
	})

	return (
		<Card className='flex flex-col items-center justify-center pt-5'>
			<CardContent className='grid w-full grid-cols-2 gap-4'>
				{data && data.tasks && data.tasks.length > 0 ? (
					data?.tasks?.map((task, index) => (
						<div
							key={index}
							className='col-span-1 flex w-[20rem] flex-col items-center justify-between gap-2 rounded-md border p-2'
						>
							<span>{task.title}</span>
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
														<AlertDialogAction asChild>
															<Button
																onClick={() => finishTask({ id: task.id })}
															>
																Finalizar
															</Button>
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
												<AlertDialogTrigger>
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
														<AlertDialogAction asChild>
															<Button
																onClick={() => deleteTask({ id: task.id })}
															>
																Excluir
															</Button>
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
					))
				) : (
					<p className='col-span-2 text-center text-sm text-muted-foreground'>
						Nenhuma atividade adicionada ainda.
					</p>
				)}
			</CardContent>
		</Card>
	)
}
