import { styled } from 'styled-components'
import { COLORS, SHADOWS, SIZES } from '../../const'

export const Message = styled('div')<{ $own?: boolean }>`
	--color: ${({ $own }) => ($own ? COLORS.msgOwn : COLORS.msgOther)};
	--divide: calc(${SIZES.message.lineHeight} + 2 * ${SIZES.gutterYsm});
	flex-shrink: 0;
	align-self: ${({ $own }) => ($own ? 'flex-end' : 'flex-start')};
	position: relative;
	width: ${SIZES.message.width};
	margin: ${SIZES.gutterY} ${SIZES.gutterX} 0;
	border-radius: ${SIZES.message.borderRadius};
	box-shadow: ${SHADOWS.message};
	background: linear-gradient(
		to bottom,
		var(--color) 0%,
		var(--color) var(--divide),
		#fff var(--divide),
		#fff 100%
	);
	line-height: ${SIZES.message.lineHeight};

	&::after {
		content: '';
		display: block;
		width: ${SIZES.message.tailSide};
		height: ${SIZES.message.tailSide};
		position: absolute;
		top: 75%;
		${({ $own }) => ($own ? 'right' : 'left')}: 0;
		background: ${COLORS.msgBase};
		transform: translate(${({ $own }) => ($own ? '50%' : '-50%')}, -50%) rotate(45deg);
	}
`

export const Header = styled('div')`
	display: flex;
	justify-content: space-between;
	height: calc(${SIZES.message.lineHeight} + 2 * ${SIZES.gutterYsm});
	padding: ${SIZES.gutterYsm} ${SIZES.gutterX};
`

export const Base = styled('div')`
	padding: ${SIZES.gutterYsm} ${SIZES.gutterX};
`

export const Username = styled('div')`
	color: ${COLORS.msgUsername};
`

export const Time = styled('div')`
	color: ${COLORS.msgTime};
`
