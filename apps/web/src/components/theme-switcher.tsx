import { LuMoon, LuSun } from 'react-icons/lu'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

export function ThemeSwitcher() {
	const { setTheme, theme } = useTheme()
	async function handleTheme() {
		const togleTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(togleTheme)
	}

	return (
		<Button variant='outline' size='icon' onClick={() => handleTheme()}>
			<LuSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
			<LuMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
		</Button>
	)
}
