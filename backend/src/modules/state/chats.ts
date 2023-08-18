import {
	getChatForClient,
	getEmptyChat,
	getEmptyChatForClient,
	getEmptyMessage,
	getEmptySeenSingle,
	getUserIdTupleString,
} from './chats.util.js'
import { users } from './users.js'

// Do not mutate this state directly, only through actions provided below
export const chats: IStoredChats = {}

export const getChat = (userId: string, otherId: string): IStoredChat | undefined => {
	const chatId = getUserIdTupleString(userId, otherId)
	return chats[chatId]
}

export const getChatsForClient = (userId: string): IChats => {
	const existingChats: IChats = Object.fromEntries(
		Object.entries(chats)
			.filter(([id, chat]) => chat.userIDs.includes(userId))
			.sort(([id1, chat1], [id2, chat2]) =>
				(chat1.messages.at(-1)?.time || '') > (chat2.messages.at(-1)?.time || '') ? -1 : 1
			)
			.map(([id, chat]) => [
				chat.userIDs.find((id) => id !== userId) || '',
				getChatForClient(users, chat, userId),
			])
	)

	const emptyChats: IChats = Object.fromEntries(
		Object.entries(users)
			.filter(([id, user]) => !Object.keys(existingChats).includes(id) && id !== userId)
			.sort(([id1, user1], [id2, user2]) =>
				user1.name.toLowerCase() < user2.name.toLowerCase() ? -1 : 1
			)
			.map(([id, user]) => [id, getEmptyChatForClient(user)])
	)

	return {
		...existingChats,
		...emptyChats,
	}
}

export const setTypingStatus = (
	userId: string,
	otherUserId: string,
	isTyping: boolean,
	timeout?: NodeJS.Timeout
): boolean => {
	const chat = getChat(userId, otherUserId)
	if (!chat) return false

	const index = chat.userIDs.indexOf(userId)
	const typingState = chat.typingState[index]

	clearTimeout(typingState.timeout)

	typingState.isTyping = isTyping
	typingState.timeout = timeout

	return true
}

export const getOrCreateChat = (userId: string, otherId: string): IStoredChat => {
	const chatId = getUserIdTupleString(userId, otherId)
	chats[chatId] ||= getEmptyChat(userId, otherId)
	return chats[chatId]
}

export const addMessage = (otherUserId: string, content: string, userId: string): IMessage => {
	const chat = getOrCreateChat(userId, otherUserId)

	if (!chat) return getEmptyMessage()

	const message: IMessage = {
		id: chat.nextMessageID,
		content,
		time: new Date().toISOString(),
		userId,
	}

	chat.messages.push(message)
	chat.nextMessageID++

	return message
}

export const markAsSeen = (
	otherUserId: string,
	userId: string,
	lastSeenMessageID: number
): UserSeen => {
	const chat = getChat(userId, otherUserId)

	if (!chat) return getEmptySeenSingle()

	const index = chat.userIDs.indexOf(userId)
	chat.seen[index].lastSeenMessageID = lastSeenMessageID
	chat.seen[index].time = new Date().toISOString()

	return chat.seen[index]
}
