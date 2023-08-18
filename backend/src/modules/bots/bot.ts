import { addMessage, getChat, markAsSeen, setTypingStatus } from '../state/chats.js'
import { getEmptyMessage } from '../state/chats.util.js'
import { User, UserConstructorParams } from '../users/user.js'
import { SERVER_EVENTS } from '../ws/websocket.const.js'
import { CustomServer } from '../ws/websocket.types.js'

export type BotConstructorParams = Omit<UserConstructorParams, 'online'> & {
	io: CustomServer
	typingDuration?: number
}

export class Bot extends User {
	protected readonly io: CustomServer
	protected readonly typingDuration: number

	constructor({ io, typingDuration = 0, avatarURL, ...params }: BotConstructorParams) {
		const baseAvatarURL = `${process.env.CLIENT_URL}/assets/bot-avatars/`

		super({ ...params, avatarURL: baseAvatarURL + avatarURL, online: true })
		this.io = io
		this.typingDuration = typingDuration
	}

	protected markAsSeen(userId: string, message?: IMessage) {
		const chat = getChat(this.id, userId)
		if (!chat) return

		message ||= chat.messages.at(-1) ?? getEmptyMessage()

		const seen = markAsSeen(userId, this.id, message.id)
		this.io.to(userId).emit(SERVER_EVENTS.seen, this.id, seen)
	}

	protected async wait(): Promise<void> {
		await new Promise((resolve) => setTimeout(resolve, this.typingDuration))
	}

	protected async type(userId: string): Promise<void> {
		if (!this.typingDuration) return

		setTypingStatus(this.id, userId, true)
		this.io.to(userId).emit(SERVER_EVENTS.startTyping, this.id)

		await this.wait()

		setTypingStatus(this.id, userId, false)
		this.io.to(userId).emit(SERVER_EVENTS.endTyping, this.id)
	}

	protected getResponse(msg: string): string {
		return ''
	}

	protected respond(userId: string, message: string) {
		const response = this.getResponse(message)
		const addedMessage = addMessage(userId, response, this.id)
		this.io.to(userId).emit(SERVER_EVENTS.newMessage, this.id, addedMessage)
	}

	async onUserOnline(userId: string): Promise<void> {}

	async onNewMessage(userId: string, message: IMessage): Promise<void> {
		this.markAsSeen(userId, message)
		await this.type(userId)
		this.respond(userId, message.content)
	}

	async onDisconnect(userId: string): Promise<void> {}
}
