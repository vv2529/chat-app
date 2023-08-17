import { BACKEND_KEYS } from '../const'

export class WebService {
	static getEmptyUser(): IUser {
		return {
			id: '',
			name: '',
			avatarURL: '',
			about: '',
			online: false,
		}
	}

	private static getEmptySeenSingle = (): UserSeen => ({ time: '', lastSeenMessageID: -1 })

	private static getEmptySeen = (): ChatSeen => ({
		self: this.getEmptySeenSingle(),
		other: this.getEmptySeenSingle(),
	})

	static getEmptyChat(userId: string): IChat {
		return {
			...this.getEmptyUser(),
			id: userId,
			messages: [],
			seen: this.getEmptySeen(),
			isTyping: false,
		}
	}

	static getUserProfile({ online, ...userProfile }: IUser): IUserProfile {
		return userProfile
	}

	static getAntiCacheString() {
		return String(Math.random()).slice(2)
	}

	static async register(): Promise<IUser> {
		return await (
			await fetch(
				new URL(
					`/api/${BACKEND_KEYS.register}?r=${this.getAntiCacheString()}`,
					process.env.REACT_APP_BACKEND_URL
				)
			)
		).json()
	}

	static async getChats(userId: string): Promise<IChats> {
		return await (
			await fetch(
				new URL(
					`/api/${BACKEND_KEYS.chats}/${userId}?r=${this.getAntiCacheString()}`,
					process.env.REACT_APP_BACKEND_URL
				)
			)
		).json()
	}
}
