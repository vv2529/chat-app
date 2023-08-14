import { styled } from 'styled-components'
import { COLORS, SIZES } from '../../const'

export const Header = styled('div')`
	display: flex;
	height: ${SIZES.chat.header.height};
	background: ${COLORS.chatHeaderBG};
`

export const Picture = styled('img')`
	width: ${SIZES.chat.header.height};
	height: ${SIZES.chat.header.height};
`

export const Content = styled('div')`
	padding: ${SIZES.gutterYsm} ${SIZES.chat.header.paddingX};
	overflow-y: auto;
`

export const Username = styled('h2')`
	font-size: ${SIZES.chat.header.font};
	font-weight: 500;
`

export const Details = styled('p')``
