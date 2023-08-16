import { DelayBot } from './delay-bot.js'

export class ReverseBot extends DelayBot {
	constructor() {
		const delayS = 3
		super({
			id: 'ReverseBot',
			name: 'Reverse bot',
			about: `Takes your messages and reverses them. It takes ${delayS} seconds of intense thinking though.`,
			avatarURL: '',
			delayMS: delayS * 1000,
		})
	}

	getResponse(msg: string): string {
		return msg.split('').reverse().join('')
	}
}
