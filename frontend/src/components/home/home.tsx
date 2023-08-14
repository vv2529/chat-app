import * as Styled from './home.styled'
import { Chat, Contacts } from '../'

export const Home = () => {
	return (
		<Styled.Container>
			<Styled.Header>
				<Styled.HeaderTitle>Chat bots 2.0</Styled.HeaderTitle>
			</Styled.Header>
			<Styled.Main>
				<Styled.MainContainer>
					<Chat />
					<Contacts />
				</Styled.MainContainer>
			</Styled.Main>
		</Styled.Container>
	)
}
