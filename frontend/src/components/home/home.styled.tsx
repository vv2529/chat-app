import { styled } from 'styled-components'
import Checkbox from '@mui/material/Checkbox'
import { BREAKPOINTS, COLORS, SIZES } from '../../const'

export const Container = styled('div')`
	display: flex;
	flex-direction: column;
	width: 100vw;
	min-height: 100vh;
	background: ${COLORS.pageBG};
`

export const Header = styled('header')`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	min-height: ${SIZES.header.height};
	max-height: ${SIZES.header.height};
	padding: 0 ${(parseInt(SIZES.marginX) / BREAKPOINTS.md) * 100}% ${SIZES.gutterY};
	background: ${COLORS.headerBG};

	@media (min-width: ${BREAKPOINTS.md}px) {
		justify-content: start;
		padding: 0 ${SIZES.marginX} ${SIZES.gutterY};
	}
`

export const HeaderTitle = styled('h1')`
	font-size: ${SIZES.header.font};
	font-weight: 600;
	line-height: 1;

	@media (min-width: ${BREAKPOINTS.lg}px) {
		width: calc(100% - 2 * ${SIZES.marginX});
		max-width: ${SIZES.main.maxWidth};
		margin-left: auto;
		margin-right: auto;
	}
`

export const HeaderContactsToggle = styled('div')`
	border: 1px solid ${COLORS.lightBorder};
	border-radius: ${SIZES.header.toggle.borderRadius};
	background: ${COLORS.headerBG};
	transition: filter 0.25s;
	cursor: pointer;

	&:hover {
		filter: brightness(0.95);
	}
	&:focus-within {
		filter: brightness(0.9);
	}

	@media (min-width: ${BREAKPOINTS.md}px) {
		display: none;
	}
`

export const HeaderContactsCheckbox = styled(Checkbox).attrs({ disableRipple: true })`
	&& {
		padding: ${SIZES.header.toggle.paddingY} ${SIZES.header.toggle.paddingX};

		&.Mui-checked {
			color: #000;
		}
	}
`

export const Main = styled('main')`
	font-size: ${SIZES.main.font};
`

export const MainContainer = styled('div')`
	display: flex;
	width: 100%;
	min-height: calc(100vh - ${SIZES.header.height});
	border-top: 1px solid ${COLORS.lightBorder};

	@media (min-width: ${BREAKPOINTS.lg}px) {
		width: calc(100% - 2 * ${SIZES.marginX});
		max-width: ${SIZES.main.maxWidth};
		min-height: calc(
			100vh - ${SIZES.header.height} - ${SIZES.main.paddingTop} - ${SIZES.main.paddingBottom}
		);
		margin: ${SIZES.main.paddingTop} auto ${SIZES.main.paddingBottom};
		border-top: none;
		border-radius: ${SIZES.main.borderRadius};
		overflow: hidden;
	}
`
