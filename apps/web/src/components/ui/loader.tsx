import type { IconBaseProps } from 'react-icons'
import { LuLoader } from 'react-icons/lu'

import { cn } from '@/lib/utils'

export function Loader({ className, ...props }: IconBaseProps) {
	return (
		<LuLoader {...props} className={cn('animate-spin text-black', className)} />
	)
}
