import { styled } from 'styled-components'
import { Tabs } from '@mui/base/Tabs'
import { BREAKPOINTS, COLORS, SIZES } from '../../const'

export const Contacts = styled(Tabs)<{ $shown: boolean }>`
	all: unset;
	position: absolute;
	display: ${({ $shown }) => ($shown ? 'flex' : 'none')};
	flex-direction: column;
	width: 100%;
	height: calc(100vh - ${SIZES.header.height} - 1px);
	background: ${COLORS.contactsBG};

	@media (min-width: ${BREAKPOINTS.md}px) {
		position: relative;
		display: flex;
		width: ${SIZES.contact.width};
		height: auto;
		min-width: ${SIZES.contact.minWidth};
	}
`

export const ContactsList = styled('div')`
	flex-grow: 1;
	width: ${SIZES.contact.widthSm};
	margin: 0 auto;
	overflow-y: auto;

	@media (min-width: ${BREAKPOINTS.md}px) {
		width: unset;
		margin: 0;
	}
`

export const SearchControls = styled('div')`
	margin: ${SIZES.gutterY} ${SIZES.gutterX};
	margin-top: 0;
`

export const SearchInput = styled('input')`
	width: 100%;
	padding: ${SIZES.input.paddingY} ${SIZES.gutterX};
`
