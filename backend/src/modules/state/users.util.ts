export const getUserMetadata = ({ id, name, avatarURL, about, online }: IUser): IUser => ({
	id,
	name,
	avatarURL,
	about,
	online,
})

export const getUsersMetadata = (users: IUsers): IUsers =>
	Object.fromEntries(Object.entries(users).map(([id, user]) => [id, getUserMetadata(user)]))

export const createNewUser = (userProfile: IUserProfile): IUser => ({
	...userProfile,
	online: true,
})
