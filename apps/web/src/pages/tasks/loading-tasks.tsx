import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function LoadingTasks() {
	return (
		<Card className='flex flex-col items-center justify-center pt-5'>
			<CardContent className='grid min-h-[40rem] w-full min-w-[40rem] grid-cols-2 grid-rows-5 gap-4'>
				{Array.from({ length: 10 }).map((_, index) => (
					<Skeleton
						key={index}
						className='col-span-1 flex max-h-[8rem] w-[20rem] flex-col items-center justify-between gap-2 rounded-md border p-2'
					/>
				))}
			</CardContent>
		</Card>
	)
}
