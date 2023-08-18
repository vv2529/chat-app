import { Bot } from './bot.js'
import { CustomServer } from '../ws/websocket.types.js'

export class IgnoreBot extends Bot {
	constructor(io: CustomServer) {
		super({
			id: 'IgnoreBot',
			name: 'Ignore bot',
			about: 'Will never respond to you.',
			avatarURL: 'ignore-bot.png',
			io,
		})
	}

	getResponse(msg: string) {
		return ''
	}

	async onNewMessage(userId: string, message: IMessage): Promise<void> {
		this.markAsSeen(userId, message)
	}
}
