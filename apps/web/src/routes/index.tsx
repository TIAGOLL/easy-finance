import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ForgotPassword } from '@/pages/Auth/ForgotPassword'
import { SignIn } from '@/pages/Auth/SignIn'
import { SignUp } from '@/pages/Auth/SignUp'
import { Home } from '@/pages/Home'

function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path='/auth/signin' element={<SignIn />} />
				<Route path='/auth/signup' element={<SignUp />} />
				<Route path='/auth/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</BrowserRouter>
	)
}

export default RoutesApp
