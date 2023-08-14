import { createGlobalStyle } from 'styled-components'
import { COLORS, SHADOWS, SIZES } from '../const'

export const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	html,
	body {
		overflow-x: hidden;
	}

	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
			'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}

	img {
		image-rendering: pixelated;
	}

	input[type=text], input[type=search], input[type=password] {
		padding: ${SIZES.input.paddingY} ${SIZES.input.paddingX};
		border: 1px solid ${COLORS.lightBorder};
		border-radius: ${SIZES.input.borderRadius};
		transition: box-shadow 0.25s;

		&:focus {
			outline: none;
			box-shadow: ${SHADOWS.input};
		}
	}

	button {
		all: unset;
		margin-left: ${SIZES.gutterX};
		padding: ${SIZES.button.paddingY} ${SIZES.button.paddingX};
		border-radius: ${SIZES.button.borderRadius};
		background: ${COLORS.button};
		font-weight: 500;
		color: ${COLORS.buttonText};
		white-space: nowrap;
		transition: filter 0.25s;
		user-select: none;
		cursor: pointer;

		&:hover {
			filter: brightness(0.95);
		}
		&:focus {
			filter: brightness(0.9);
		}
	}
`
