import { Bot, BotConstructorParams } from './bot.js'

export type DelayBotConstructorParams = BotConstructorParams & { delayMS: number }

export abstract class DelayBot extends Bot {
	private delay: number

	constructor({ delayMS, ...params }: DelayBotConstructorParams) {
		super(params)
		this.delay = delayMS
	}

	respondWithDelay(msg: string): void {
		this.getResponse(msg)
	}
}
