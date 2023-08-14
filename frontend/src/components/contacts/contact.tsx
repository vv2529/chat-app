import { formatTime } from '../../util'
import * as Styled from './contact.styled'

export const Contact: React.FC<{ chat: Chat }> = ({ chat }) => {
	const lastMessage = chat.messages.at(-1)

	return (
		<Styled.Contact to={`/@${chat.id}`} $online={chat.online}>
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
