import * as Styled from './home.styled'
import { Chat, Contacts } from '../'
import { OtherUserIdProvider } from '../../context/other-user'

export const Home = () => {
	return (
		<Styled.Container>
			<Styled.Header>
				<Styled.HeaderTitle>Chat bots 2.0</Styled.HeaderTitle>
			</Styled.Header>
			<Styled.Main>
				<Styled.MainContainer>
					<OtherUserIdProvider>
						<Chat />
						<Contacts />
					</OtherUserIdProvider>
				</Styled.MainContainer>
			</Styled.Main>
		</Styled.Container>
	)
}
