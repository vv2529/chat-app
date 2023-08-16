import { User, UserConstructorParams } from '../users/user.js'

export type BotConstructorParams = Omit<UserConstructorParams, 'online'>

export abstract class Bot extends User {
	constructor(params: BotConstructorParams) {
		super({ ...params, online: true })
	}

	abstract getResponse(msg: string): string
}
