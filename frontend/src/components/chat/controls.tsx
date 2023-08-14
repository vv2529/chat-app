import * as Styled from './controls.styled'

export const Controls = () => {
	return (
		<Styled.Controls onSubmit={(e) => e.preventDefault()}>
			<Styled.MessageInput type="text" placeholder="Start chatting!" />
			<Styled.SendButton type="submit">Send message</Styled.SendButton>
		</Styled.Controls>
	)
}
