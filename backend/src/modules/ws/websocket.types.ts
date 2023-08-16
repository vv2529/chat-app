import { Server, Socket } from 'socket.io'
import { CLIENT_EVENTS, SERVER_EVENTS } from './websocket.const.js'

type ClientToServerEvents = {
	[CLIENT_EVENTS.connection]: (socket: Socket) => void
	[CLIENT_EVENTS.userOnline]: (user: IUserProfile) => void
	[CLIENT_EVENTS.startTyping]: (otherUserId: string) => void
	[CLIENT_EVENTS.newMessage]: (otherUserId: string, message: string) => void
	[CLIENT_EVENTS.seen]: (otherUserId: string) => void
	[CLIENT_EVENTS.disconnect]: () => void
}

type ServerToClientEvents = {
	[SERVER_EVENTS.userOnline]: (userId: string) => void
	[SERVER_EVENTS.newChat]: (newChat: IChat) => void
	[SERVER_EVENTS.startTyping]: (typingUserId: string) => void
	[SERVER_EVENTS.endTyping]: (typingUserId: string) => void
	[SERVER_EVENTS.newMessage]: (otherUserId: string, message: string) => void
	[CLIENT_EVENTS.seen]: (seenUserId: string, time: string) => void
	[SERVER_EVENTS.userOffline]: (userId: string) => void
}

export type CustomServer = Server<ClientToServerEvents, ServerToClientEvents, {}, { user: IUser }>
