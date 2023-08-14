import { styled } from 'styled-components'
import { COLORS, SIZES } from '../../const'

export const Body = styled('div')`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	min-height: ${SIZES.chat.minHeight};
	padding: 0 ${SIZES.gutterX};
	overflow-y: scroll;
`

const InfoText = styled('div')`
	color: ${COLORS.chatInfoText};
`

export const CenterText = styled(InfoText)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	user-select: none;
`

export const TypingText = styled(InfoText)`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin-bottom: ${SIZES.gutterY};
`

export const SeenTime = styled('div')`
	align-self: flex-end;
	width: ${SIZES.message.width};
	padding-top: ${SIZES.message.seenTimePaddingTop};
	font-size: ${SIZES.message.seenTimeFont};
	color: ${COLORS.msgSeenTime};
`
