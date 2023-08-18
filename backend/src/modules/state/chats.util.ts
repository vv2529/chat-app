import { getUserMetadata } from './users.util.js'

export const getEmptyChat = (userId: string, otherId: string): IStoredChat => {
	const userIDs = getUserIdTuple(userId, otherId)

	return {
		userIDs,
		messages: [],
		seen: [getEmptySeenSingle(), getEmptySeenSingle()],
		typingState: [getEmptyTypingState(), getEmptyTypingState()],
		nextMessageID: 0,
	}
}

export const getChatForClient = (users: IUsers, chat: IStoredChat, userId: string): IChat => {
	const otherIndex = chat.userIDs.findIndex((id) => id !== userId)
	const index = 1 - otherIndex
	const otherId = chat.userIDs[otherIndex]

	return {
		...getUserMetadata(users[otherId]),
		messages: chat.messages,
		seen: {
			self: chat.seen[index],
			other: chat.seen[otherIndex],
		},
		isTyping: chat.typingState[otherIndex].isTyping,
	}
}

export const getEmptyChatForClient = (user: IUser): IChat => ({
	...getUserMetadata(user),
	messages: [],
	seen: getEmptySeen(),
	isTyping: false,
})

export const getEmptySeenSingle = (): UserSeen => ({ time: '', lastSeenMessageID: -1 })

export const getEmptySeen = (): ChatSeen => ({
	self: getEmptySeenSingle(),
	other: getEmptySeenSingle(),
})

export const getEmptyTypingState = (): UserTyping => ({ isTyping: false })

export const getIndexInTuple = (userId: string, otherId: string): 0 | 1 =>
	userId < otherId ? 0 : 1

export const getUserIdTuple = (userId: string, otherId: string): [string, string] =>
	userId < otherId ? [userId, otherId] : [otherId, userId]

export const getUserIdTupleString = (userId: string, otherId: string): string =>
	getUserIdTuple(userId, otherId).join('-')
