type User = {
	id: string
	name: string
	avatarURL: string
	about?: string
	online?: boolean
}

type Message = {
	id: number
	content: string
	time: string
	userId: string
}

type Chat = {
	userId: string
	messages: Message[]
	seen: string
	isTyping: boolean
}
