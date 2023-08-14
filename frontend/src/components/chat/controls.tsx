import * as Styled from './controls.styled'

export const Controls: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
	return (
		<Styled.Controls onSubmit={(e) => e.preventDefault()}>
			<Styled.MessageInput type="text" placeholder="Start chatting!" disabled={disabled} />
			<Styled.SendButton type="submit" disabled={disabled}>
				Send message
			</Styled.SendButton>
		</Styled.Controls>
	)
}
