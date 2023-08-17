import { useOtherUserId } from '../../context/other-user'
import { formatTime } from '../../util'
import * as Styled from './contact.styled'

export const Contact: React.FC<{ chat: IChat }> = ({ chat }) => {
	const { userId } = useOtherUserId()

	const lastMessage = chat.messages.at(-1)
	const notSeenCount: number = (chat.messages.at(-1)?.id ?? -1) - chat.seen.self.lastSeenMessageID

	return (
		<Styled.Contact to={`/@${chat.id}`} $online={chat.online}>
			{chat.id !== userId && notSeenCount > 0 && <Styled.Badge>{notSeenCount}</Styled.Badge>}
			<Styled.Picture src={chat.avatarURL} alt={chat.name} />
			<Styled.Content>
				<Styled.Username>{chat.name}</Styled.Username>
				{lastMessage && (
					<>
						<Styled.LastMessagePreview>{lastMessage.content}</Styled.LastMessagePreview>
						<Styled.LastMessageTime>{formatTime(lastMessage.time)}</Styled.LastMessageTime>
					</>
				)}
			</Styled.Content>
		</Styled.Contact>
	)
}
