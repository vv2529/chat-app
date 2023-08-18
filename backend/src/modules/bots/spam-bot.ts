import { Bot } from './bot.js'
import { CustomServer } from '../ws/websocket.types.js'
import { getRandom } from '../util/index.js'
import { generateMessage } from '../util/message-generation.js'

export class SpamBot extends Bot {
	private readonly minDelay: number = 10
	private readonly maxDelay: number = 120
	private timers: { [key: string]: NodeJS.Timeout } = {}

	constructor(io: CustomServer) {
		super({
			id: 'SpamBot',
			name: 'Spam bot',
			about: 'Will never listen to you.',
			avatarURL: 'spam-bot.png',
			io,
		})
	}

	getResponse(msg: string) {
		return generateMessage()
	}

	protected sendSpam(userId: string) {
		this.markAsSeen(userId)
		this.respond(userId, '')
		this.initSpamCycle(userId)
	}

	protected initSpamCycle(userId: string) {
		const delayS = getRandom(this.minDelay, this.maxDelay)
		this.timers[userId] = setTimeout(() => this.sendSpam(userId), delayS * 1000)
	}

	async onUserOnline(userId: string): Promise<void> {
		this.initSpamCycle(userId)
	}

	async onNewMessage(userId: string, message: IMessage) {}

	async onDisconnect(userId: string): Promise<void> {
		clearTimeout(this.timers[userId])
		delete this.timers[userId]
	}
}
