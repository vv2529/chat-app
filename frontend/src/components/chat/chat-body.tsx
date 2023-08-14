import { useCurrentUser } from '../../context/current-user'
import { formatTime } from '../../util'
import * as Styled from './chat-body.styled'
import { Message } from './message'

export const ChatBody: React.FC<
	{ chat: Chat; children?: React.ReactNode } | { chat?: Chat; children: React.ReactNode }
> = ({ chat, children }) => {
	return (
		<Styled.Body>
			{chat ? (
				<ChatBodyWithUser chat={chat} />
			) : (
				<ChatBodyWithInfoText>{children}</ChatBodyWithInfoText>
			)}
		</Styled.Body>
	)
}

const ChatBodyWithUser: React.FC<{ chat: Chat }> = ({ chat }) => {
	const currentUser = useCurrentUser()

	const renderedMessages = chat.messages.length ? (
		<>
			{chat.messages.map((msg) => (
				<Message
					key={msg.id}
					own={msg.userId === currentUser.id}
					username={msg.userId === chat.id ? chat.name : currentUser.name}
					time={msg.time}
					content={msg.content}
				/>
			))}
			{chat.seen && <Styled.SeenTime>{formatTime(chat.seen)}</Styled.SeenTime>}
			{chat.isTyping && <Styled.TypingText>{chat.name} is typing…</Styled.TypingText>}
		</>
	) : (
		<ChatBodyWithInfoText>Send a message to start a chat</ChatBodyWithInfoText>
	)

	return <>{renderedMessages}</>
}

const ChatBodyWithInfoText: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <Styled.CenterText>{children}</Styled.CenterText>
}
