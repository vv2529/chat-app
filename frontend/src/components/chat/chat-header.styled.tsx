import { styled } from 'styled-components'
import { BREAKPOINTS, COLORS, SIZES } from '../../const'

export const Header = styled('div')`
	display: flex;
	height: ${SIZES.chat.header.heightSm};
	background: ${COLORS.chatHeaderBG};

	@media (min-width: ${BREAKPOINTS.md}px) {
		height: ${SIZES.chat.header.height};
	}
`

export const Picture = styled('img')`
	flex-shrink: 0;
	width: ${SIZES.chat.header.heightSm};
	height: ${SIZES.chat.header.heightSm};

	@media (min-width: ${BREAKPOINTS.md}px) {
		width: ${SIZES.chat.header.height};
		height: ${SIZES.chat.header.height};
	}
`

export const Content = styled('div')`
	padding: 0 ${SIZES.chat.header.paddingXsm};
	overflow: hidden;

	@media (min-width: ${BREAKPOINTS.md}px) {
		padding: ${SIZES.gutterYsm} ${SIZES.chat.header.paddingX};
	}
`

export const Username = styled('h2')`
	font-size: ${SIZES.chat.header.font};
	font-weight: 500;
`

export const Details = styled('p')``
