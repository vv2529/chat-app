import { BACKEND_KEYS } from '../const'

export class WebService {
	private static getAntiCacheString() {
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
