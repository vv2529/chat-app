import { useEffect, useState } from 'react'
import { STORAGE_KEYS } from '../const'

const getLocalUser = (): User | null => {
	const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || '""')
	return user || null
}

export const useGetCurrentUser = (): [
	User | null,
	React.Dispatch<React.SetStateAction<User | null>>
] => {
	const [user, setUser] = useState(getLocalUser)

	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
	}, [user])

	return [user, setUser]
}
