export const CLIENT_EVENTS = {
	userOnline: 'user online',
	startTyping: 'start typing',
	newMessage: 'new message',
	seen: 'seen',
} as const

export const SERVER_EVENTS = {
	connect: 'connect',
	userOnline: 'user online',
	newChat: 'new chat',
	startTyping: 'start typing',
	endTyping: 'end typing',
	newMessage: 'new message',
	seen: 'seen',
	userOffline: 'user offline',
} as const
