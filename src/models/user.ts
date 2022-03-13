import { v4 as uuid } from "uuid"

export default class {
	id!: string
	username!: string
	password!: string
	name!: string
	surname!: string

	constructor(username: string, password: string, name: string, surname: string, id?: string) {
		this.id = id || uuid();
		this.username = username
		this.password = password
		this.name = name
		this.surname = surname
	}
}