import { bots } from './bots.js'
import { createNewUser } from './users.util.js'

// Do not mutate this state directly, only through actions provided below
export const users: IUsers = bots

export const registerUser = (user: IUserProfile): boolean => {
	const userCreated = !(user.id in users)
	users[user.id] ||= createNewUser(user)
	return userCreated
}

export const setOnlineStatus = (userId: string, online: boolean): boolean => {
	if (!(userId in users)) return false
	users[userId].online = online
	return true
}
