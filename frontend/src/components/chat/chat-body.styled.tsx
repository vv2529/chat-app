import { styled } from 'styled-components'
import { COLORS, SIZES } from '../../const'

export const Body = styled('div')`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	height: 0;
	min-height: ${SIZES.chat.minHeight};
	padding: 0 ${SIZES.gutterX};
	overflow-y: scroll;
`

const InfoText = styled('div')`
	display: flex;
	justify-content: center;
	color: ${COLORS.chatInfoText};
	user-select: none;
`

export const CenterText = styled(InfoText)`
	align-items: center;
	height: 100%;
`

export const TypingText = styled(InfoText)<{ $hidden: boolean }>`
	flex-grow: 1;
	align-items: flex-end;
	margin: ${SIZES.infoText.marginY} 0;
	opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
`

export const SeenTime = styled('div')`
	align-self: flex-end;
	width: ${SIZES.message.width};
	padding-top: ${SIZES.message.seenTimePaddingTop};
	font-size: ${SIZES.message.seenTimeFont};
	color: ${COLORS.msgSeenTime};
`
