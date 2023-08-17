import { styled } from 'styled-components'
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
	align-items: flex-end;
	min-height: ${SIZES.header.height};
	max-height: ${SIZES.header.height};
	padding-bottom: ${SIZES.gutterY};
	background: ${COLORS.headerBG};
`

export const HeaderTitle = styled('h1')`
	margin-left: ${SIZES.marginX};
	font-size: ${SIZES.header.font};
	font-weight: 600;
	line-height: 1;

	@media (min-width: ${BREAKPOINTS.md}px) {
		width: calc(100% - ${SIZES.marginX});
		max-width: ${SIZES.main.maxWidth};
		margin: 0 auto;
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

	@media (min-width: ${BREAKPOINTS.md}px) {
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
