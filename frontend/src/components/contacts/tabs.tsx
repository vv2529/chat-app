import * as Styled from './tabs.styled'

export const Tabs = () => {
	return (
		<Styled.ContactsTabs>
			<Styled.ContactsTab value="online">Online</Styled.ContactsTab>
			<Styled.ContactsTab value="all">All</Styled.ContactsTab>
		</Styled.ContactsTabs>
	)
}
