import { styled } from 'styled-components'
import { COLORS, SIZES } from '../../const'
import { Tabs } from '@mui/base/Tabs'

export const Contacts = styled(Tabs)`
	all: unset;
	width: ${SIZES.contact.width};
	display: flex;
	flex-direction: column;
	background: ${COLORS.contactsBG};
`

export const ContactsList = styled('div')`
	flex-grow: 1;
	overflow-y: auto;
`

export const SearchControls = styled('div')`
	margin: ${SIZES.gutterY} ${SIZES.gutterX};
	margin-top: 0;
`

export const SearchInput = styled('input')`
	width: 100%;
	padding: ${SIZES.input.paddingY} ${SIZES.gutterX};
`
