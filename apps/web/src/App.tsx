import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import RoutesApp from './routes'

function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<RoutesApp />
			<Toaster />
		</ThemeProvider>
	)
}

export default App
