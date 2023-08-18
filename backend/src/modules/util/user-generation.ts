import {
	adjectives,
	animals,
	colors,
	NumberDictionary,
	uniqueNamesGenerator,
} from 'unique-names-generator'

type NameComponents = {
	adjective: string
	color: string
	noun: string
	number: string
}

const generateNameComponents = (): NameComponents => {
	const numberDict = NumberDictionary.generate({ length: 3 })
	const name = uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals, numberDict],
		separator: ' ',
		style: 'capital',
	})

	const components = name.split(' ')

	return {
		adjective: components[0],
		color: components[1],
		noun: components[2],
		number: components[3],
	}
}

const getName = (components: NameComponents): string =>
	[components.adjective, components.noun].join(' ')

const getId = (components: NameComponents): string =>
	[components.adjective, components.noun, components.number].join('-').toLowerCase()

const getAbout = (components: NameComponents): string =>
	`Just a ${[components.adjective, components.color, components.noun].join(' ').toLowerCase()}.`

const getBoringAvatarsURL = (id: string): string => {
	const baseUrl = 'https://source.boringavatars.com'
	const size = 170
	const variant = 'beam'
	// Colors picked from Material Design palette. Could be any set of nice-looking colors.
	const colorPool = ['FF8A80', 'EA80FC', '8C9EFF', '80D8FF', 'A7FFEB', 'CCFF90', 'FFFF8D', 'FFD180']

	return `${baseUrl}/${variant}/${size}/${id}?square&colors=${colorPool.join(',')}`
}

const generateAvatarURL = (name: string): string => getBoringAvatarsURL(name)

export const generateUser = (): IUser => {
	const nameComponents = generateNameComponents()
	const name = getName(nameComponents) // Big Donkey
	const id = getId(nameComponents) // big-donkey-123
	const about = getAbout(nameComponents) // Just a big red donkey.
	const avatarURL = generateAvatarURL(id)

	return { id, name, avatarURL, about, online: true }
}
