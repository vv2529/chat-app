export const getEmptyUser = (): IUser => ({
	id: '',
	name: '',
	avatarURL: '',
	about: '',
	online: false,
})

export const getUserProfile = ({ online, ...userProfile }: IUser): IUserProfile => userProfile
