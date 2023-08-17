import { EchoBot } from '../bots/echo-bot.js'
import { ReverseBot } from '../bots/reverse-bot.js'
import {
	createNewUser,
	getChat,
	getEmptySeenSingle,
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
		seen: [getEmptySeenSingle(), getEmptySeenSingle()],
		typingState: [getEmptyTypingState(), getEmptyTypingState()],
		nextMessageID: 0,
	}
}

export const getOrCreateChat = (userId: string, otherId: string): IStoredChat => {
	const chatId = getUserIdTupleString(userId, otherId)
	chats[chatId] ||= getEmptyChat(userId, otherId)
	return chats[chatId]
}

export const addMessage = (chat: IStoredChat, content: string, userId: string): IMessage => {
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

export const markAsSeen = (chat: IStoredChat, userId: string, lastSeenMessageID: number): void => {
	const index = chat.userIDs.indexOf(userId)
	chat.seen[index].lastSeenMessageID = lastSeenMessageID
	chat.seen[index].time = new Date().toISOString()
}
