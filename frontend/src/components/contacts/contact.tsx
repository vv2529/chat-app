import * as Styled from './contact.styled'

export const Contact: React.FC<{ user: User; online?: boolean; active?: boolean }> = ({
	user: { name, avatarURL, id },
	online,
	active,
}) => {
	return (
		<Styled.Contact to={`/@${id}`} $online={online} $active={active}>
			<Styled.Picture src={avatarURL} alt={name} />
			<Styled.Content>
				<Styled.Username>{name}</Styled.Username>
				<Styled.LastMessagePreview>aaaaa</Styled.LastMessagePreview>
			</Styled.Content>
		</Styled.Contact>
	)
}
