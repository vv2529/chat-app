import { createContext, useContext, useEffect, useState } from 'react'
import { WebService } from '../services/web.service'

const Chats = createContext<Chats>({})

export const useChats = (): Chats => useContext(Chats)
export const useChat = (userId: string): Chat | null => {
	const chats = useContext(Chats)
	return chats[userId] || null
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [chats, setChats] = useState<Chats>({})

	useEffect(() => {
		const setInitialChats = async () => {
			setChats(await WebService.getChats())
		}
		setInitialChats()
	}, [])

	return <Chats.Provider value={chats}>{children}</Chats.Provider>
}
