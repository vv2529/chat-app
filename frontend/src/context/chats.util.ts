import { getEmptyUser } from './users.util'

export const getEmptySeenSingle = (): UserSeen => ({ time: '', lastSeenMessageID: -1 })

export const getEmptySeen = (): ChatSeen => ({
	self: getEmptySeenSingle(),
	other: getEmptySeenSingle(),
})

export const getEmptyChat = (userId: string): IChat => ({
	...getEmptyUser(),
	id: userId,
	messages: [],
	seen: getEmptySeen(),
	isTyping: false,
})
