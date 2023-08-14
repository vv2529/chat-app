import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './protected-route'
import { Home, Login, Logout } from '../components'
import { NavigateToRoot } from './navigation'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ProtectedRoute auth={<Home />} noauth={<Login />} />} />
				<Route path="/:userId" element={<ProtectedRoute auth={<Home />} />} />
				<Route path="/logout" element={<ProtectedRoute auth={<Logout />} />} />
				<Route path="*" element={<NavigateToRoot />} />
			</Routes>
		</BrowserRouter>
	)
}
