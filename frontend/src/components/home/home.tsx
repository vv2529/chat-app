import { useEffect, useState } from 'react'
import PersonOutline from '@mui/icons-material/PersonOutline'
import Person from '@mui/icons-material/Person'
import * as Styled from './home.styled'
import { Chat, Contacts } from '../'
import { OtherUserIdProvider, useOtherUserId } from '../../context/other-user'

export const Home = () => (
	<OtherUserIdProvider>
		<HomeWithProviders />
	</OtherUserIdProvider>
)

const HomeWithProviders = () => {
	const { userId } = useOtherUserId()
	const [contactsShown, setContactsShown] = useState(false)

	useEffect(() => {
		setContactsShown(false)
	}, [userId])

	return (
		<Styled.Container>
			<Styled.Header>
				<Styled.HeaderTitle>Chat bots 2.0</Styled.HeaderTitle>
				<Styled.HeaderContactsToggle>
					<Styled.HeaderContactsCheckbox
						icon={<PersonOutline />}
						checkedIcon={<Person />}
						checked={contactsShown}
						onChange={(e) => setContactsShown(e.target.checked)}
					/>
				</Styled.HeaderContactsToggle>
			</Styled.Header>
			<Styled.Main>
				<Styled.MainContainer>
					<Chat />
					<Contacts shown={contactsShown} />
				</Styled.MainContainer>
			</Styled.Main>
		</Styled.Container>
	)
}
