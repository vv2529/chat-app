import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { COLORS, SIZES } from '../../const'

export const Contact = styled(Link)<{ $active?: boolean; $online?: boolean }>`
	position: relative;
	display: flex;
	background: ${({ $active }) => ($active ? COLORS.lightBG : 'transparent')};
	text-decoration: none;

	&:hover,
	&:focus {
		background: ${COLORS.lightBG};
	}

	&::after {
		content: '';
		position: absolute;
		bottom: calc(${SIZES.contact.statusSize} / 4);
		left: calc(${SIZES.gutterX} / 2 + ${SIZES.contact.size} - ${SIZES.contact.statusSize} / 4);
		width: ${SIZES.contact.statusSize};
		height: ${SIZES.contact.statusSize};
		border-radius: 50%;
		background: ${({ $online }) => ($online ? COLORS.onlineStatus : COLORS.offlineStatus)};
	}
`

export const Picture = styled('img')`
	flex-shrink: 0;
	width: ${SIZES.contact.size};
	height: ${SIZES.contact.size};
	margin: ${SIZES.contact.paddingY} ${SIZES.gutterX};
`

export const Content = styled('div')`
	margin: ${SIZES.contact.contentPaddingY} 0;
`

export const Username = styled('div')`
	color: ${COLORS.darkText};
	font-weight: bold;
`

export const LastMessagePreview = styled('div')`
	color: ${COLORS.lightText};
`
