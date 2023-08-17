import {
	adjectives,
	animals,
	colors,
	NumberDictionary,
	uniqueNamesGenerator,
} from 'unique-names-generator'
import { chats } from '../state/state.js'

export const getUserMetadata = ({ id, name, avatarURL, about, online }: IUser): IUser => ({
	id,
	name,
	avatarURL,
	about,
	online,
})

export const getUsersMetadata = (users: IUsers): IUsers =>
	Object.fromEntries(Object.entries(users).map(([id, user]) => [id, getUserMetadata(user)]))

export const getChatsForClient = (users: IUsers, chats: IStoredChats, userId: string): IChats => {
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

export const createNewUser = (userProfile: IUserProfile): IUser => ({
	...userProfile,
	online: true,
})

export const getChat = (userId: string, otherId: string): IStoredChat | undefined => {
	const chatId = getUserIdTupleString(userId, otherId)
	return chats[chatId]
}

type NameComponents = {
	adjective: string
	color: string
	noun: string
	number: string
}

const generateNameComponents = (): NameComponents => {
	const numberDict = NumberDictionary.generate({ length: 3 })
	const name = uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals, numberDict],
		separator: ' ',
		style: 'capital',
	})

	const components = name.split(' ')

	return {
		adjective: components[0],
		color: components[1],
		noun: components[2],
		number: components[3],
	}
}

const getName = (components: NameComponents): string =>
	[components.adjective, components.noun].join(' ')

const getId = (components: NameComponents): string =>
	[components.adjective, components.noun, components.number].join('-').toLowerCase()

const getAbout = (components: NameComponents): string =>
	`Just a ${[components.adjective, components.color, components.noun].join(' ').toLowerCase()}.`

const getBoringAvatarsURL = (id: string): string => {
	const baseUrl = 'https://source.boringavatars.com'
	const size = 170
	const variant = 'beam'
	// Colors picked from Material Design palette. Could be any set of nice-looking colors.
	const colorPool = ['FF8A80', 'EA80FC', '8C9EFF', '80D8FF', 'A7FFEB', 'CCFF90', 'FFFF8D', 'FFD180']

	return `${baseUrl}/${variant}/${size}/${id}?square&colors=${colorPool.join(',')}`
}

const generateAvatarURL = (name: string): string => getBoringAvatarsURL(name)

export const generateUser = (): IUser => {
	const nameComponents = generateNameComponents()
	const name = getName(nameComponents) // Big Donkey
	const id = getId(nameComponents) // big-donkey-123
	const about = getAbout(nameComponents) // Just a big red donkey.
	const avatarURL = generateAvatarURL(id)

	return { id, name, avatarURL, about, online: true }
}
