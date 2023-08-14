import { useLogout, useRegister } from '../../context/current-user'
import * as Styled from './auth.styled'

export const Login = () => {
	const register = useRegister()

	return (
		<Styled.Container>
			<Styled.Button onClick={register}>Login</Styled.Button>
		</Styled.Container>
	)
}

export const Logout = () => {
	const logout = useLogout()

	return (
		<Styled.Container>
			<Styled.Button onClick={logout}>Logout</Styled.Button>
		</Styled.Container>
	)
}
