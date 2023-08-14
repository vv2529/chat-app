import { createContext, useContext } from 'react'
import { WebService } from '../services/web.service'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../const'

const CurrentUser = createContext<User>(WebService.getEmptyUser())
const Register = createContext<() => void>(() => {})
const Logout = createContext<() => void>(() => {})

export const useCurrentUser = () => useContext(CurrentUser)
export const useRegister = () => useContext(Register)
export const useLogout = () => useContext(Logout)

export const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useLocalStorage<User>(
		STORAGE_KEYS.user,
		WebService.getEmptyUser
	)

	const register = async () => {
		setCurrentUser(await WebService.register())
	}

	const logout = () => {
		setCurrentUser(WebService.getEmptyUser())
	}

	return (
		<CurrentUser.Provider value={currentUser}>
			<Register.Provider value={register}>
				<Logout.Provider value={logout}>{children}</Logout.Provider>
			</Register.Provider>
		</CurrentUser.Provider>
	)
}
