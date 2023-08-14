import * as Styled from './message.styled'

export const Message: React.FC<{
	own?: boolean
	username: string
	time: string
	content: string
}> = ({ own, username, time, content }) => {
	return (
		<Styled.Message $own={own}>
			<Styled.Header>
				<Styled.Username>{username}</Styled.Username>
				<Styled.Time>{time}</Styled.Time>
			</Styled.Header>
			<Styled.Base>{content}</Styled.Base>
		</Styled.Message>
	)
}
