import { ThemeSwitcher } from '@/components/theme-switcher'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreateTaskForm } from '@/forms/create-task-form'

import { FinishedTasks } from './finished-tasks'
import { PendingTasks } from './pending-tasks'

export function Tasks() {
	return (
		<div className='flex h-screen w-full flex-col place-items-center px-4 py-8'>
			<div className='absolute bottom-32 left-32'>
				<ThemeSwitcher />
			</div>
			<h1 className='mb-4 flex justify-center text-2xl font-semibold'>
				Minhas tarefas
			</h1>
			<div className='flex justify-center'>
				<CreateTaskForm classname='w-[25rem]' />
			</div>
			<Tabs
				defaultValue='pending-tasks'
				className='flex flex-col place-items-center'
			>
				<TabsList>
					<TabsTrigger value='pending-tasks' className='w-[15rem]'>
						Pendentes
					</TabsTrigger>
					<TabsTrigger value='finished-tasks' className='w-[15rem]'>
						Finalizadas
					</TabsTrigger>
				</TabsList>
				<TabsContent value='pending-tasks'>
					<PendingTasks />
				</TabsContent>
				<TabsContent value='finished-tasks'>
					<FinishedTasks />
				</TabsContent>
			</Tabs>
		</div>
	)
}
