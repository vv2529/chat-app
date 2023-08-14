import { useGetCurrentUser } from '../hooks/auth'
import { NavigateToRoot } from './navigation'

export const ProtectedRoute: React.FC<{ auth?: JSX.Element; noauth?: JSX.Element }> = ({
	auth = <NavigateToRoot />,
	noauth = <NavigateToRoot />,
}) => {
	const [user] = useGetCurrentUser()

	return user?.id ? noauth : auth // for testing
	// return user ? auth : noauth
}
