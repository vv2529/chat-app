export const getRandom = (from: number, to: number): number =>
	Math.floor(Math.random() * (to + 1 - from)) + from
