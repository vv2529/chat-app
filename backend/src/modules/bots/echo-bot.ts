import { Bot } from './bot.js'
import { CustomServer } from '../ws/websocket.types.js'

export class EchoBot extends Bot {
	constructor(io: CustomServer) {
		super({
			id: 'EchoBot',
			name: 'Echo bot',
			about: 'Echoes your messages back to you.',
			avatarURL: 'echo-bot.png',
			io,
		})
	}

	getResponse(msg: string): string {
		return msg
	}
}
