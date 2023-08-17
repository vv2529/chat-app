import { useMemo, useState } from 'react'
import { Contact } from './contact'
import * as Styled from './contacts.styled'
import { Tabs } from './tabs'
import { useChats } from '../../context/chats'

type FilterType = 'online' | 'all'

export const Contacts: React.FC<{ shown: boolean }> = ({ shown }) => {
	const chats = useChats()
	const [filter, setFilter] = useState<FilterType>('online')
	const [search, setSearch] = useState('')

	const shownChats = useMemo(() => {
		const chatsArray = Object.values(chats)
		return chatsArray.filter((chat) => {
			if (filter === 'online' && !chat.online) return false
			return chat.name.toLowerCase().includes(search.toLowerCase())
		})
	}, [chats, filter, search])

	return (
		<Styled.Contacts
			$shown={shown}
			value={filter}
			onChange={(e, newFilter) => setFilter(newFilter as FilterType)}
		>
			<Tabs />
			<Styled.ContactsList>
				{shownChats.map((chat) => (
					<Contact key={chat.id} chat={chat} />
				))}
			</Styled.ContactsList>
			<Styled.SearchControls>
				<Styled.SearchInput
					type="search"
					placeholder="Search…"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Styled.SearchControls>
		</Styled.Contacts>
	)
}
