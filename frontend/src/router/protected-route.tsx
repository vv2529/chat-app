import { useCurrentUser } from '../context/current-user'
import { NavigateToRoot } from './navigation'

export const ProtectedRoute: React.FC<{ auth?: React.ReactNode; noauth?: React.ReactNode }> = ({
	auth = <NavigateToRoot />,
	noauth = <NavigateToRoot />,
}) => {
	const user = useCurrentUser()

	return user.id ? auth : noauth
}
