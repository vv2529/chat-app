import React, { useEffect, useRef } from 'react'
import { useCurrentUser } from '../../context/current-user'
import { formatTime } from '../../util'
import * as Styled from './chat-body.styled'
import { Message } from './message'
import { useSocketActions } from '../../context/socket'
import { useChatActions } from '../../context/chats'

export const ChatBody: React.FC<
	{ chat: IChat; children?: React.ReactNode } | { chat?: IChat; children: React.ReactNode }
> = ({ chat, children }) => {
	return chat ? (
		<ChatBodyWithUser chat={chat} />
	) : (
		<ChatBodyWithInfoText>{children}</ChatBodyWithInfoText>
	)
}

const ChatBodyWithUser: React.FC<{ chat: IChat }> = ({ chat }) => {
	const currentUser = useCurrentUser()
	const { isConnected, markAsSeen } = useSocketActions()
	const { setSeen } = useChatActions()
	const chatBody = useRef<HTMLDivElement | null>(null)

	const lastMessageID = chat.messages.at(-1)?.id ?? -1

	const lastNotOwnMessageID =
		chat.messages.findLast((message) => message.userId !== currentUser.id)?.id ?? -1

	const lastSeenNotOwnMessageID =
		chat.messages.findLast(
			(message) =>
				message.id <= chat.seen.other.lastSeenMessageID && message.userId === currentUser.id
		)?.id ?? -1

	useEffect(() => {
		console.log(isConnected(), chat)
		if (isConnected() && lastNotOwnMessageID > chat.seen.self.lastSeenMessageID) {
			const seen: UserSeen = {
				time: new Date().toISOString(),
				lastSeenMessageID: lastMessageID,
			}

			markAsSeen(chat.id, seen.lastSeenMessageID)
			setSeen(chat.id, seen, true)
		}
	}, [chat, isConnected, markAsSeen, setSeen, lastNotOwnMessageID, lastMessageID])

	useEffect(() => {
		if (chatBody.current instanceof HTMLDivElement) {
			chatBody.current.scrollTop = chatBody.current.scrollHeight
		}
	}, [chat.messages.length])

	const renderedMessages = chat.messages.length ? (
		<>
			{chat.messages.map((msg) => (
				<React.Fragment key={msg.id}>
					<Message
						own={msg.userId === currentUser.id}
						username={msg.userId === chat.id ? chat.name : currentUser.name}
						time={msg.time}
						content={msg.content}
					/>
					{msg.id === lastSeenNotOwnMessageID && (
						<Styled.SeenTime>{formatTime(chat.seen.other.time)}</Styled.SeenTime>
					)}
				</React.Fragment>
			))}
			<Styled.TypingText $hidden={!chat.isTyping}>{chat.name} is typing…</Styled.TypingText>
		</>
	) : (
		<InfoText>Send a message to start a chat</InfoText>
	)

	return <Styled.Body ref={chatBody}>{renderedMessages}</Styled.Body>
}

const ChatBodyWithInfoText: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<Styled.Body>
			<InfoText>{children}</InfoText>
		</Styled.Body>
	)
}

const InfoText: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <Styled.CenterText>{children}</Styled.CenterText>
}
