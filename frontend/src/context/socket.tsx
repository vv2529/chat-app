import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { useCurrentUser } from './current-user'
import { CustomSocket } from '../types/websocket.types'
import { useChatActions, useChats } from './chats'
import { CLIENT_EVENTS, SERVER_EVENTS } from '../const/socket-events'
import { getUserProfile } from './users.util'

const createActions = (socket: CustomSocket | null, isConnected: boolean) => ({
	isConnected: () => isConnected,

	sendMessage: (userId: string, content: string) => {
		if (!socket) return
		socket.emit(CLIENT_EVENTS.newMessage, userId, content)
	},

	startTyping: (userId: string) => {
		if (!socket) return
		socket.emit(CLIENT_EVENTS.startTyping, userId)
	},

	markAsSeen: (userId: string, lastSeenMessageID: number) => {
		if (!socket) return
		socket.emit(CLIENT_EVENTS.seen, userId, lastSeenMessageID)
	},
})

// @ts-ignore
const SocketActions = createContext<ReturnType<typeof createActions>>(null)

export const useSocketActions = () => useContext(SocketActions)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const user = useCurrentUser()
	const chats = useChats()
	const { setOnlineStatus, createChat, setTypingStatus, addMessage, setSeen } = useChatActions()
	const [_socket, setSocket] = useState<CustomSocket | null>(null)
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		const initSocket = async () => {
			const socket: CustomSocket = io(process.env.REACT_APP_BACKEND_URL || '')

			socket.on(SERVER_EVENTS.connect, () => {
				setIsConnected(true)
			})

			socket.on(SERVER_EVENTS.userOnline, (userId) => {
				setOnlineStatus(userId, true)
			})

			socket.on(SERVER_EVENTS.userOffline, (userId) => {
				setOnlineStatus(userId, false)
			})

			socket.on(SERVER_EVENTS.newChat, (chat) => {
				createChat(chat)
			})

			socket.on(SERVER_EVENTS.startTyping, (userId) => {
				setTypingStatus(userId, true)
			})

			socket.on(SERVER_EVENTS.endTyping, (userId) => {
				setTypingStatus(userId, false)
			})

			socket.on(SERVER_EVENTS.newMessage, (otherUserId, message) => {
				addMessage(otherUserId, message)
			})

			socket.on(SERVER_EVENTS.seen, (userId, seen) => {
				setSeen(userId, seen, false)
			})

			socket.emit(CLIENT_EVENTS.userOnline, getUserProfile(user))

			setSocket(socket)
		}

		if (Object.values(chats).length && !_socket) initSocket()
	}, [user, chats, _socket, setOnlineStatus, createChat, setTypingStatus, addMessage, setSeen])

	const socketActions = useMemo(() => createActions(_socket, isConnected), [_socket, isConnected])

	return <SocketActions.Provider value={socketActions}>{children}</SocketActions.Provider>
}
