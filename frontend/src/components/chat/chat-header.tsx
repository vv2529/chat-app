import * as Styled from './chat-header.styled'

export const ChatHeader: React.FC<{ name: string; about?: string; avatarURL: string }> = ({
	name,
	about,
	avatarURL,
}) => {
	return (
		<Styled.Header>
			<Styled.Picture src={avatarURL} alt={name} />
			<Styled.Content>
				<Styled.Username>{name}</Styled.Username>
				<Styled.Details>{about}</Styled.Details>
			</Styled.Content>
		</Styled.Header>
	)
}
