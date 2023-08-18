import { CustomServer } from '../ws/websocket.types.js'
import { Bot } from './bot.js'

export class ReverseBot extends Bot {
	constructor(io: CustomServer) {
		const typeForS = 3

		super({
			id: 'ReverseBot',
			name: 'Reverse bot',
			about: `Takes your messages and reverses them. It takes ${typeForS} seconds of intense thinking though.`,
			avatarURL: 'reverse-bot.png',
			io,
			typingDuration: typeForS * 1000,
		})
	}

	getResponse(msg: string): string {
		return msg.split('').reverse().join('')
	}
}
