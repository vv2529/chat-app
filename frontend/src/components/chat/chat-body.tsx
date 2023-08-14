import * as Styled from './chat-body.styled'
import { Message } from './message'

const chats: { [key: string]: Chat } = {
	ReverseBot: {
		userId: 'ReverseBot',
		messages: [
			{ id: 0, content: 'Hello world!', time: '4:20 PM', userId: 'ReverseBot' },
			{ id: 1, content: 'Hello robot', time: '4:22 PM', userId: 'Username' },
		],
		seen: '4:27 PM',
		isTyping: true,
	},
}

export const ChatBody: React.FC<
	| { user: User; children?: JSX.Element | string | string[] }
	| { user?: User; children: JSX.Element | string | string[] }
> = ({ user, children }) => {
	return (
		<Styled.Body>
			{user ? (
				<ChatBodyWithUser user={user} />
			) : (
				<ChatBodyWithInfoText>{children}</ChatBodyWithInfoText>
			)}
		</Styled.Body>
	)
}

const ChatBodyWithUser: React.FC<{ user: User }> = ({ user }) => {
	const chat = chats[user.id]

	const renderedMessages = chat?.messages?.length ? (
		<>
			{chat?.messages.map((msg) => (
				<Message
					key={msg.id}
					own={msg.userId !== user.id}
					username={msg.userId === user.id ? user.name : 'Username'}
					time={msg.time}
					content={msg.content}
				/>
			))}
			{chat.seen && <Styled.SeenTime>{chat.seen}</Styled.SeenTime>}
			{chat.isTyping && <Styled.TypingText>{user.name} is typing…</Styled.TypingText>}
		</>
	) : (
		<ChatBodyWithInfoText>Send a message to start a chat</ChatBodyWithInfoText>
	)

	return <>{renderedMessages}</>
}

const ChatBodyWithInfoText: React.FC<{ children?: JSX.Element | string | string[] }> = ({
	children,
}) => {
	return <Styled.CenterText>{children}</Styled.CenterText>
}
