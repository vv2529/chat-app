import { EchoBot } from '../bots/echo-bot.js'
import { ReverseBot } from '../bots/reverse-bot.js'

const botsArray: IUser[] = [new EchoBot(), new ReverseBot()]

// Do not mutate this state directly, only through actions provided below
export const bots: IUsers = Object.fromEntries(botsArray.map((bot) => [bot.id, bot]))
