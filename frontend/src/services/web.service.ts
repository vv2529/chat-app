import EchoBotAvatar from '../assets/bot-avatars/EchoBot.png'
import ReverseBotAvatar from '../assets/bot-avatars/ReverseBot.png'
import SpamBotAvatar from '../assets/bot-avatars/SpamBot.png'
import IgnoreBotAvatar from '../assets/bot-avatars/IgnoreBot.png'

const emptyUser: User = {
	name: '',
	about: '',
	avatarURL: '',
	id: '',
}

const currentUser: User = {
	name: 'Username',
	about: 'The first user to ever exist',
	avatarURL: '',
	id: 'Username',
	online: true,
}

const chats: Chats = {
	EchoBot: {
		id: 'EchoBot',
		name: 'Echo bot',
		about: 'aaaaa',
		avatarURL: EchoBotAvatar,
		online: true,
		messages: [],
		seen: '',
		isTyping: false,
	},
	ReverseBot: {
		id: 'ReverseBot',
		name: 'Reverse bot',
		about:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo iure, at magni corporis commodi debitis pariatur quidem expedita nesciunt odio, excepturi alias omnis? Necessitatibus, consectetur? Quis optio omnis aperiam? Impedit.',
		avatarURL: ReverseBotAvatar,
		online: true,
		messages: [
			{ id: 0, content: 'Hello world!', time: '2023-08-14T13:20:00.000Z', userId: 'ReverseBot' },
			{
				id: 1,
				content:
					'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo iure, at magni corporis commodi debitis pariatur quidem expedita nesciunt odio, excepturi alias omnis? Necessitatibus, consectetur? Quis optio omnis aperiam? Impedit.',
				time: '2023-08-14T13:22:00.000Z',
				userId: 'Username',
			},
		],
		seen: '2023-08-14T13:27:00.000Z',
		isTyping: true,
	},
	SpamBot: {
		id: 'SpamBot',
		name: 'Spam bot',
		about: 'aaaaa',
		avatarURL: SpamBotAvatar,
		online: true,
		messages: [],
		seen: '',
		isTyping: false,
	},
	IgnoreBot: {
		id: 'IgnoreBot',
		name: 'Ignore bot',
		about: 'aaaaa',
		avatarURL: IgnoreBotAvatar,
		online: false,
		messages: [],
		seen: '',
		isTyping: false,
	},
}

export class WebService {
	static getEmptyUser(): User {
		return emptyUser
	}

	static getEmptyChat(userId: string): Chat {
		return {
			id: userId,
			name: '',
			about: '',
			avatarURL: '',
			online: false,
			messages: [],
			seen: '',
			isTyping: false,
		}
	}

	static async register(): Promise<User> {
		return currentUser
	}

	static async getChats(): Promise<Chats> {
		return chats
	}
}
