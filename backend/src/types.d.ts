declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string
			CLIENT_URL: string
		}
	}

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
		seen: UserSeen
		isTyping: boolean
	}

	type IStoredChat = {
		userIDs: [string, string]
		messages: IMessage[]
		seen: [UserSeen, UserSeen]
		typingState: [UserTyping, UserTyping]
		nextMessageID: number
	}

	type UserSeen = {
		time: string
		lastSeenMessageID: number
	}

	type UserTyping = {
		isTyping: boolean
		timeout?: NodeJS.Timeout
	}

	type IUsers = { [key: string]: IUser }
	type IUserProfiles = { [key: string]: IUserProfile }
	type IChats = { [key: string]: IChat }
	type IStoredChats = { [key: string]: IStoredChat }
}

export {}
