import { Bot } from '../bots/bot.js'
import { EchoBot } from '../bots/echo-bot.js'
import { IgnoreBot } from '../bots/ignore-bot.js'
import { ReverseBot } from '../bots/reverse-bot.js'
import { SpamBot } from '../bots/spam-bot.js'
import { CustomServer } from '../ws/websocket.types.js'
import { registerBots } from './users.js'

// Do not mutate this state directly, only through actions provided below
export const bots: { [key: string]: Bot } = {}

export const createBots = (io: CustomServer) => {
	const botsArray: Bot[] = [new EchoBot(io), new IgnoreBot(io), new ReverseBot(io), new SpamBot(io)]

	Object.assign(bots, Object.fromEntries(botsArray.map((bot) => [bot.id, bot])))

	registerBots()
}

export const emitUserOnline = (userId: string): void => {
	Object.values(bots).forEach((bot) => bot.onUserOnline(userId))
}

export const emitDisconnect = (userId: string): void => {
	Object.values(bots).forEach((bot) => bot.onDisconnect(userId))
}
