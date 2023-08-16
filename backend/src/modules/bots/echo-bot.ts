import { Bot } from './bot.js'

export class EchoBot extends Bot {
	constructor() {
		super({
			id: 'EchoBot',
			name: 'Echo bot',
			about: 'Echoes your messages back to you.',
			avatarURL: '',
		})
	}

	getResponse(msg: string): string {
		return msg
	}
}
