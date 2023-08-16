export type UserConstructorParams = {
	id: string
	name: string
	about: string
	online: boolean
	avatarURL: string
}

export class User implements IUser {
	public id: string
	public name: string
	public about: string
	public online: boolean
	public avatarURL: string

	constructor({ id, name, about, online, avatarURL }: UserConstructorParams) {
		this.id = id
		this.name = name
		this.about = about
		this.online = online
		this.avatarURL = avatarURL
	}
}
