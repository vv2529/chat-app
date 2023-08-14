import { NavLink } from 'react-router-dom'
import { css, styled } from 'styled-components'
import { COLORS, SIZES } from '../../const'

export const Contact = styled(NavLink)<{ $online?: boolean }>`
	position: relative;
	display: flex;
	height: calc(${SIZES.contact.size} + 2 * ${SIZES.contact.paddingY});
	/* background: ${COLORS.contactsBG}; */
	text-decoration: none;

	&.active,
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
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: calc(100% - 2 * ${SIZES.contact.contentPaddingY});
	margin: ${SIZES.contact.contentPaddingY} 0;
	margin-right: ${SIZES.contact.contentPaddingRight};
	overflow: hidden;
`

const ellipsis = css`
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`

export const Username = styled('div')`
	color: ${COLORS.darkText};
	font-weight: bold;
	${ellipsis}
`

export const LastMessagePreview = styled('div')`
	color: ${COLORS.lightText};
	${ellipsis}
`

export const LastMessageTime = styled('div')`
	color: ${COLORS.lightText};
	font-size: ${SIZES.contact.timeFont};
	text-align: right;
	${ellipsis}
`
