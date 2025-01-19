import 'react-toastify/dist/ReactToastify.css'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { Flip, ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@/components/theme-provider'
import { queryClient } from '@/lib/react-query'
import RoutesApp from '@/routes'

function App() {
	return (
		<GoogleOAuthProvider clientId='255171139259-h9mak1bd764i3r8jjjnb9ij326vkdnq5.apps.googleusercontent.com'>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
					<RoutesApp />
					<ToastContainer
						transition={Flip}
						autoClose={3000}
						draggable
						closeButton
						position='bottom-right'
						stacked
						theme={localStorage.getItem('vite-ui-theme') || 'light'}
						limit={3}
					/>
					<Analytics />
				</ThemeProvider>
			</QueryClientProvider>
		</GoogleOAuthProvider>
	)
}

export default App
