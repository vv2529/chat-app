import { useMemo, useState } from 'react'
import { Contact } from './contact'
import * as Styled from './contacts.styled'
import { Tabs } from './tabs'
import EchoBotAvatar from '../../assets/bot-avatars/EchoBot.png'
import ReverseBotAvatar from '../../assets/bot-avatars/ReverseBot.png'
import SpamBotAvatar from '../../assets/bot-avatars/SpamBot.png'
import IgnoreBotAvatar from '../../assets/bot-avatars/IgnoreBot.png'

type FilterType = 'online' | 'all'

const users: User[] = [
	{ name: 'Echo bot', about: 'aaaaa', avatarURL: EchoBotAvatar, id: 'EchoBot', online: true },
	{
		name: 'Reverse bot',
		about: 'aaaaa',
		avatarURL: ReverseBotAvatar,
		id: 'ReverseBot',
		online: true,
	},
	{ name: 'Spam bot', about: 'aaaaa', avatarURL: SpamBotAvatar, id: 'SpamBot', online: true },
	{ name: 'Ignore bot', about: 'aaaaa', avatarURL: IgnoreBotAvatar, id: 'IgnoreBot' },
]

const activeUser = 'ReverseBot'

export const Contacts = () => {
	const [filter, setFilter] = useState<FilterType>('online')

	const shownUsers = useMemo(
		() => (filter === 'online' ? users.filter((user) => user.online) : users),
		[filter]
	)

	return (
		<Styled.Contacts value={filter} onChange={(e, newFilter) => setFilter(newFilter as FilterType)}>
			<Tabs />
			<Styled.ContactsList>
				{shownUsers.map((user) => (
					<Contact key={user.id} user={user} online={user.online} active={user.id === activeUser} />
				))}
			</Styled.ContactsList>
			<Styled.SearchControls>
				<Styled.SearchInput type="search" placeholder="Search…" />
			</Styled.SearchControls>
		</Styled.Contacts>
	)
}
