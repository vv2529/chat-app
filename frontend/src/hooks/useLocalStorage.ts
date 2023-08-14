import { useEffect, useState } from 'react'

const getLocalValue = <T>(key: string, init: T | (() => T)): T => {
	if (localStorage.getItem(key) === null) return init instanceof Function ? init() : init

	return JSON.parse(localStorage.getItem(key) || '""')
}

export const useLocalStorage = <T>(
	key: string,
	init: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => getLocalValue(key, init))

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}
