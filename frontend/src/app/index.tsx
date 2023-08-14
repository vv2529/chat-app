import { ChatProvider } from '../context/chats'
import { CurrentUserProvider } from '../context/current-user'
import { GlobalStyles } from './app.styled'
import { Router } from '../router'

const App = () => {
	return (
		<CurrentUserProvider>
			<ChatProvider>
				<GlobalStyles />
				<Router />
			</ChatProvider>
		</CurrentUserProvider>
	)
}

export default App
