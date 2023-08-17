import { styled } from 'styled-components'
import { BREAKPOINTS, COLORS, SHADOWS, SIZES } from '../../const'

export const Controls = styled('form')`
	display: flex;
	margin: 0 ${SIZES.gutterX} ${SIZES.gutterY};
	margin-right: ${SIZES.controls.paddingRight};
`

export const MessageInput = styled('input')`
	flex-grow: 1;
	border: 1px solid ${COLORS.messageInputBorder};

	&:focus {
		box-shadow: ${SHADOWS.messageInput};
	}
`

export const SendButton = styled('button')<{ $contentSm: string; $contentLg: string }>`
	font-size: ${SIZES.sendButton.font};

	&::after {
		content: '${({ $contentSm }) => $contentSm}';
	}

	@media (min-width: ${BREAKPOINTS.sm}px) {
		&::after {
			content: '${({ $contentLg }) => $contentLg}';
		}
	}

	@media (min-width: ${BREAKPOINTS.lg}px) {
		padding: ${SIZES.input.paddingY} ${SIZES.sendButton.paddingXlg};
	}
`
