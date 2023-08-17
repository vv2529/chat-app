import { useState } from 'react'
import * as Styled from './controls.styled'
import { useSocketActions } from '../../context/socket'
import { TYPING_DELAY } from '../../const'

export const Controls: React.FC<{ userId: string; disabled?: boolean }> = ({
	userId,
	disabled,
}) => {
	const [input, setInput] = useState('')
	const [canSubmit, setCanSubmit] = useState(false)
	const [lastTypingUpdate, setLastTypingUpdate] = useState(() => new Date(0))
	const { sendMessage, startTyping } = useSocketActions()

	const onInput = () => {
		const now = new Date()

		if (+now - +lastTypingUpdate > TYPING_DELAY) {
			startTyping(userId)
			setLastTypingUpdate(now)
		}
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const content = e.target.value.trim()
		setInput(e.target.value)
		setCanSubmit(!!content)
	}

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const content = input.trim()

		if (content) {
			sendMessage(userId, content)
			setInput('')
			setCanSubmit(false)
		}
	}

	return (
		<Styled.Controls onSubmit={onSubmit}>
			<Styled.MessageInput
				value={input}
				onChange={onChange}
				onInput={onInput}
				type="text"
				placeholder="Start chatting!"
				disabled={disabled}
			/>
			<Styled.SendButton
				type="submit"
				disabled={disabled || !canSubmit}
				$contentSm="Send"
				$contentLg="Send message"
			/>
		</Styled.Controls>
	)
}
