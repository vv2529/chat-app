import { createContext, useContext, useEffect, useState } from 'react'
import { useChat } from './chats'
import { useParams } from 'react-router'

const getEmptyOtherUserId = (): { flag: ParamFlag; userId: string } => ({
	flag: 'empty',
	userId: '',
})

const OtherUserId = createContext(getEmptyOtherUserId())

export const useOtherUserId = () => useContext(OtherUserId)

type ParamFlag = 'ok' | 'not-found' | 'empty' | 'invalid'

export const useCheckParam = (atUserId?: string): { flag: ParamFlag; userId: string } => {
	const userId = atUserId?.slice(1) || ''
	const chat = useChat(userId)

	if (!atUserId) return { flag: 'empty', userId: '' }
	if (atUserId[0] !== '@' || atUserId.length === 1) return { flag: 'invalid', userId: '' }

	return chat ? { flag: 'ok', userId } : { flag: 'not-found', userId }
}

export const OtherUserIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { atUserId } = useParams()
	const { flag, userId } = useCheckParam(atUserId)
	const [otherUserId, setOtherUserId] = useState(getEmptyOtherUserId())

	useEffect(() => {
		setOtherUserId({ flag, userId })
	}, [flag, userId])

	return <OtherUserId.Provider value={otherUserId}>{children}</OtherUserId.Provider>
}
