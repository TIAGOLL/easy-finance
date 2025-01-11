import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ForgotPassword } from './../pages/auth/request-password-recover/index'
import { ResetPassword } from './../pages/auth/reset-password/index'
import { SignIn } from './../pages/auth/sign-In/index'
import { SignUp } from './../pages/auth/sign-up/index'
import { Home } from './../pages/home/index'
import { Tasks } from './../pages/tasks/index'
import { Private } from './private'

function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path='/auth/sign-in' element={<SignIn />} />
				<Route path='/auth/sign-up' element={<SignUp />} />
				<Route path='/auth/reset-password/:token' element={<ResetPassword />} />
				<Route path='/auth/forgot-password' element={<ForgotPassword />} />

				{/* Área logada */}
				<Route
					path='/tasks'
					element={
						<Private>
							<Tasks />
						</Private>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default RoutesApp
