import { EchoBot } from '../bots/echo-bot.js'
import { ReverseBot } from '../bots/reverse-bot.js'
import {
	createNewUser,
	getChat,
	getEmptySeen,
	getEmptyTypingState,
	getUserIdTuple,
	getUserIdTupleString,
} from '../users/users.util.js'

const botsArray: IUser[] = [new EchoBot(), new ReverseBot()]
const bots: IUsers = Object.fromEntries(botsArray.map((bot) => [bot.id, bot]))

export const users: IUsers = bots
export const chats: IStoredChats = {}

export const registerUser = (user: IUserProfile): boolean => {
	const userCreated = !(user.id in users)
	users[user.id] ||= createNewUser(user)
	return userCreated
}

export const setOnlineStatus = (userId: string, online: boolean): boolean => {
	if (!(userId in users)) return false
	users[userId].online = online
	return true
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

export const getEmptyChat = (userId: string, otherId: string): IStoredChat => {
	const userIDs = getUserIdTuple(userId, otherId)

	return {
		userIDs,
		messages: [],
		seen: [getEmptySeen(), getEmptySeen()],
		typingState: [getEmptyTypingState(), getEmptyTypingState()],
		nextMessageID: 0,
	}
}

export const getOrCreateChat = (userId: string, otherId: string): IStoredChat => {
	const chatId = getUserIdTupleString(userId, otherId)
	chats[chatId] ||= getEmptyChat(userId, otherId)
	return chats[chatId]
}

export const addMessage = (chat: IStoredChat, message: string, userId: string): void => {
	chat.messages.push({
		id: chat.nextMessageID,
		content: message,
		time: new Date().toISOString(),
		userId,
	})

	chat.nextMessageID++
}

export const markAsSeen = (chat: IStoredChat, userId: string): void => {
	const index = chat.userIDs.indexOf(userId)
	chat.seen[index].lastSeenMessageID = chat.nextMessageID - 1
	chat.seen[index].time = new Date().toISOString()
}
