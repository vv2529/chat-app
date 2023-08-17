import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { WebService } from '../services/web.service'
import { useCurrentUser } from './current-user'

const sortChats = (chats: IChats): IChats =>
	Object.fromEntries(
		Object.entries(chats).sort(([id1, chat1], [id2, chat2]) => {
			const isEmpty1 = chat1.messages.length === 0
			const isEmpty2 = chat2.messages.length === 0

			if (!isEmpty1 && !isEmpty2)
				return (chat1.messages.at(-1)?.time || '') > (chat2.messages.at(-1)?.time || '') ? -1 : 1

			if (!isEmpty1 && isEmpty2) return -1
			if (isEmpty1 && !isEmpty2) return 1

			if (chat1.online && !chat2.online) return -1
			if (!chat1.online && chat2.online) return 1

			return chat1.name < chat2.name ? -1 : 1
		})
	)

const createActions = (chats: IChats, setChats: React.Dispatch<React.SetStateAction<IChats>>) => ({
	setOnlineStatus: (userId: string, online: boolean): void => {
		if (!chats[userId]) return
		chats[userId].online = online
		setChats({ ...chats })
	},

	createChat: (chat: IChat): void => {
		if (!chat) return
		chats[chat.id] = chat
		chats = sortChats(chats)
		setChats({ ...chats })
	},

	setTypingStatus: (userId: string, isTyping: boolean): void => {
		if (!chats[userId]) return
		chats[userId].isTyping = isTyping
		setChats({ ...chats })
	},

	addMessage: (otherUserId: string, message: IMessage): void => {
		const chat = chats[otherUserId]
		if (!chat) return

		chat.messages.push(message)

		if (message.userId === otherUserId) chat.isTyping = false
		else chat.seen.self.lastSeenMessageID = message.id

		chats = sortChats(chats)

		setChats({ ...chats })
	},

	setSeen: (userId: string, seen: UserSeen, self: boolean): void => {
		if (!chats[userId]) return
		chats[userId].seen[self ? 'self' : 'other'] = seen
		setChats({ ...chats })
	},
})

const Chats = createContext<IChats>({})
// @ts-ignore
const ChatActions = createContext<ReturnType<typeof createActions>>({})

export const useChats = (): IChats => useContext(Chats)
export const useChat = (userId: string): IChat | null => {
	const chats = useContext(Chats)
	return chats[userId] || null
}

export const useChatActions = () => useContext(ChatActions)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const user = useCurrentUser()
	const [chats, setChats] = useState<IChats>({})

	useEffect(() => {
		const setInitialChats = async () => {
			setChats(sortChats(await WebService.getChats(user.id)))
		}
		if (user.id) setInitialChats()
	}, [user])

	const chatActions = useMemo(() => createActions(chats, setChats), [chats])

	return (
		<Chats.Provider value={chats}>
			<ChatActions.Provider value={chatActions}>{children}</ChatActions.Provider>
		</Chats.Provider>
	)
}
