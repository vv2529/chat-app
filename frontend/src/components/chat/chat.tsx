import { useParams } from 'react-router'
import * as Styled from './chat.styled'
import { Controls } from './controls'
import { ChatHeader } from './chat-header'
import { ChatBody } from './chat-body'
import { NavigateToRoot } from '../../router/navigation'
import { useChat } from '../../context/chats'

type ParamFlag = 'ok' | 'not-found' | 'empty' | 'invalid'

const useCheckParam = (atUserId?: string): [ParamFlag, string, Chat?] => {
	const userId = atUserId?.slice(1) || ''
	const chat = useChat(userId)

	if (!atUserId) return ['empty', '']
	if (atUserId[0] !== '@' || atUserId.length === 1) return ['invalid', '']

	return chat ? ['ok', userId, chat] : ['not-found', userId]
}

export const Chat = () => {
	const { atUserId } = useParams()
	const [flag, userId, chat] = useCheckParam(atUserId)

	return (
		<Styled.Chat>
			{chat ? (
				<ChatWithUser chat={chat} />
			) : flag === 'not-found' ? (
				<ChatWithNotFound userId={userId} />
			) : flag === 'empty' ? (
				<ChatWithNoUser />
			) : (
				<NavigateToRoot />
			)}
			<Controls disabled={flag !== 'ok'} />
		</Styled.Chat>
	)
}

const ChatWithUser: React.FC<{ chat: Chat }> = ({ chat }) => {
	return (
		<>
			<ChatHeader name={chat.name} about={chat.about} avatarURL={chat.avatarURL} />
			<ChatBody chat={chat} />
		</>
	)
}

const ChatWithNoUser = () => {
	return <ChatBody>Select a chat to start messaging</ChatBody>
}

const ChatWithNotFound: React.FC<{ userId: string }> = ({ userId }) => {
	return <ChatBody>User @{userId} not found.</ChatBody>
}
