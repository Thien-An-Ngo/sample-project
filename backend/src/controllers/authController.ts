import UserRepo from "../repositories/userRepository"
import User from "../models/user"

export const getUser = async (req, res) => {
	const user = await UserRepo.getUserByUsername(`${req.query.username}`)
	res.status(200)
	return res.json({user: user})
}

export const newUser = async (req, res) => {
	console.log("hurz1")
	console.log(req.body)
	if (isDataIncomplete(res, ['username', 'name', 'surname', 'password'], req.body)) {
		return
	}
	const {username, name, surname, password} = req.body
	console.log("hurz")
	if (await UserRepo.exists('username', username)) {
		res.status(400)
		return res.json({error: "Account already exists."})
	}
	const newUser = new User(username, name, surname, password)
	await UserRepo.add(newUser)
	res.status(200)
	return res.json({msg: 'success'})
}


// auxiliary functions
const isDataIncomplete = (res, keys: string[], obj: object): boolean => {
	const data = {}
	let isData = true
	keys.forEach(key => {
		if (!isValue(obj[key])) {
			isData = false
		}
		data[key] = isValue(obj[key])
	})
	if (!isData) {
		data['error'] = "data incomplete"
		res.status(400)
		res.json(data)
		return true
	}
	return false
}

const isValue = (val: any): boolean => {
	return !(val === undefined || val === null || val.length <= 0);
}