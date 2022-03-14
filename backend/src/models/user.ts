import { v4 as uuid } from "uuid"

export default class {
	id!: string
	username!: string
	name!: string
	surname!: string
	password!: string

	constructor(username: string, name: string, surname: string, password: string, id?: string) {
		this.id = id || uuid()
		this.username = username
		this.name = name
		this.surname = surname
		this.password = password
	}
}