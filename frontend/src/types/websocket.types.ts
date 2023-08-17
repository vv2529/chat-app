import { Socket } from 'socket.io-client'
import { CLIENT_EVENTS, SERVER_EVENTS } from '../const/socket-events'

type ClientToServerEvents = {
	[CLIENT_EVENTS.userOnline]: (user: IUserProfile) => void
	[CLIENT_EVENTS.startTyping]: (otherUserId: string) => void
	[CLIENT_EVENTS.newMessage]: (otherUserId: string, message: string) => void
	[CLIENT_EVENTS.seen]: (otherUserId: string, lastSeenMessageID: number) => void
}

type ServerToClientEvents = {
	[SERVER_EVENTS.userOnline]: (userId: string) => void
	[SERVER_EVENTS.newChat]: (newChat: IChat) => void
	[SERVER_EVENTS.startTyping]: (typingUserId: string) => void
	[SERVER_EVENTS.endTyping]: (typingUserId: string) => void
	[SERVER_EVENTS.newMessage]: (otherUserId: string, message: IMessage) => void
	[SERVER_EVENTS.seen]: (seenUserId: string, seen: UserSeen) => void
	[SERVER_EVENTS.userOffline]: (userId: string) => void
}

export type CustomSocket = Socket<ServerToClientEvents, ClientToServerEvents>
