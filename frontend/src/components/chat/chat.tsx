import { useParams } from 'react-router'
import * as Styled from './chat.styled'
import { Controls } from './controls'
import { ChatHeader } from './chat-header'
import { ChatBody } from './chat-body'
import { NavigateToRoot } from '../../router/navigation'
import EchoBotAvatar from '../../assets/bot-avatars/EchoBot.png'
import ReverseBotAvatar from '../../assets/bot-avatars/ReverseBot.png'
import SpamBotAvatar from '../../assets/bot-avatars/SpamBot.png'
import IgnoreBotAvatar from '../../assets/bot-avatars/IgnoreBot.png'

const users: User[] = [
	{ name: 'Echo bot', about: 'aaaaa', avatarURL: EchoBotAvatar, id: 'EchoBot' },
	{ name: 'Reverse bot', about: 'aaaaa', avatarURL: ReverseBotAvatar, id: 'ReverseBot' },
	{ name: 'Spam bot', about: 'aaaaa', avatarURL: SpamBotAvatar, id: 'SpamBot' },
	{ name: 'Ignore bot', about: 'aaaaa', avatarURL: IgnoreBotAvatar, id: 'IgnoreBot' },
]

export const Chat = () => {
	const { userId } = useParams()

	return (
		<Styled.Chat>
			<HandleUserId userId={userId} />
			<Controls />
		</Styled.Chat>
	)
}

// Passing userId as a prop instead of directly using a hook for easier testing
const HandleUserId: React.FC<{ userId?: string }> = ({ userId }) => {
	if (!userId) return <ChatWithNoUser />

	if (userId[0] !== '@' || userId.length === 1) return <NavigateToRoot />

	userId = userId.slice(1)
	const user = users.find((user) => user.id === userId)
	return user ? <ChatWithUser user={user} /> : <ChatWithNotFound userId={userId} />
}

const ChatWithUser: React.FC<{ user: User }> = ({ user }) => {
	return (
		<>
			<ChatHeader user={user} />
			<ChatBody user={user} />
		</>
	)
}

const ChatWithNoUser = () => {
	return <ChatBody>Select a chat to start messaging</ChatBody>
}

const ChatWithNotFound: React.FC<{ userId: string }> = ({ userId }) => {
	return <ChatBody>User @{userId} not found.</ChatBody>
}
