import { styled } from 'styled-components'
import { COLORS, SIZES } from '../../const'
import { TabsList } from '@mui/base'
import { Tab } from '@mui/base/Tab'

export const ContactsTabs = styled(TabsList)`
	all: unset;
	display: flex;
	color: ${COLORS.tabText};
`

export const ContactsTab = styled(Tab)`
	all: unset;
	width: 100%;
	padding-top: ${SIZES.gutterY};
	padding-bottom: ${SIZES.tab.paddingBottom};
	background: ${COLORS.lightBG};
	border: 1px solid ${COLORS.lightBorder};
	text-align: center;
	cursor: pointer;

	&.Mui-selected {
		background: none;
		border-color: transparent;
	}

	&:hover,
	&:focus {
		text-decoration: underline;
	}
`
