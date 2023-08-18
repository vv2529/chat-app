import { adjectives, animals, NumberDictionary, uniqueNamesGenerator } from 'unique-names-generator'

export const generateMessage = (): string => {
	const numberDict = NumberDictionary.generate()
	const name = uniqueNamesGenerator({
		dictionaries: [numberDict, adjectives, animals],
		separator: ' ',
		style: 'lowerCase',
	})

	// №123: big donkey
	return `№${name.replace(' ', ': ')}`
}
