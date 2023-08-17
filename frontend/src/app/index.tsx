import { ChatProvider } from '../context/chats'
import { CurrentUserProvider } from '../context/current-user'
import { GlobalStyles } from './app.styled'
import { Router } from '../router'
import { SocketProvider } from '../context/socket'

const App = () => {
	return (
		<CurrentUserProvider>
			<ChatProvider>
				<SocketProvider>
					<GlobalStyles />
					<Router />
				</SocketProvider>
			</ChatProvider>
		</CurrentUserProvider>
	)
}

export default App
