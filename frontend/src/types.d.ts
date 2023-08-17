type IUserProfile = {
	id: string
	name: string
	avatarURL: string
	about: string
}

type IUser = IUserProfile & {
	online: boolean
}

type IMessage = {
	id: number
	content: string
	time: string
	userId: string
}

type IChat = IUser & {
	messages: IMessage[]
	seen: ChatSeen
	isTyping: boolean
}

type UserSeen = {
	time: string
	lastSeenMessageID: number
}

type ChatSeen = {
	self: UserSeen
	other: UserSeen
}

type IChats = { [key: string]: IChat }
