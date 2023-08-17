import * as Styled from './chat.styled'
import { Controls } from './controls'
import { ChatHeader } from './chat-header'
import { ChatBody } from './chat-body'
import { NavigateToRoot } from '../../router/navigation'
import { useOtherUserId } from '../../context/other-user'
import { useChat } from '../../context/chats'

export const Chat = () => {
	const { flag, userId } = useOtherUserId()
	const chat = useChat(userId)

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
			<Controls userId={userId} disabled={flag !== 'ok'} />
		</Styled.Chat>
	)
}

const ChatWithUser: React.FC<{ chat: IChat }> = ({ chat }) => {
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
