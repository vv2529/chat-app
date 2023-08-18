export const formatTime = (isoTime: string): string => {
	try {
		return new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: 'numeric',
		}).format(new Date(isoTime))
	} catch {
		return ''
	}
}
