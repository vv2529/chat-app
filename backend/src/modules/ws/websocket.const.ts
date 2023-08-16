export const CLIENT_EVENTS = {
	connection: 'connection',
	userOnline: 'user online',
	startTyping: 'start typing',
	newMessage: 'new message',
	seen: 'seen',
	disconnect: 'disconnect',
} as const

export const SERVER_EVENTS = {
	userOnline: 'user online',
	newChat: 'new chat',
	startTyping: 'start typing',
	endTyping: 'end typing',
	newMessage: 'new message',
	seen: 'seen',
	userOffline: 'user offline',
} as const

export const TYPING_DURATION = 2000
