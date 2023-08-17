import { styled } from 'styled-components'
import { COLORS } from '../../const'

export const Chat = styled('div')`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	max-width: 100vw;
	background: ${COLORS.chatBG};
`
