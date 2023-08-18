import { createContext, useContext } from 'react'
import { WebService } from '../services/web.service'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../const'
import { getEmptyUser } from './users.util'

const CurrentUser = createContext<IUser>(getEmptyUser())
const Register = createContext<() => void>(() => {})
const Logout = createContext<() => void>(() => {})

export const useCurrentUser = () => useContext(CurrentUser)
export const useRegister = () => useContext(Register)
export const useLogout = () => useContext(Logout)

export const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useLocalStorage<IUser>(STORAGE_KEYS.user, getEmptyUser)

	const register = async () => {
		setCurrentUser(await WebService.register())
	}

	const logout = () => {
		setCurrentUser(getEmptyUser())
		window.location.reload()
	}

	return (
		<CurrentUser.Provider value={currentUser}>
			<Register.Provider value={register}>
				<Logout.Provider value={logout}>{children}</Logout.Provider>
			</Register.Provider>
		</CurrentUser.Provider>
	)
}
