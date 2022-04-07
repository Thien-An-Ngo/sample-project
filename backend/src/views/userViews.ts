import User from '../models/user'
import UserRepository from '../repositories/userRepository'

export const homeView = (req, res, next) => {
	console.log('hurz')
	return res.render('')
}

export const registerView = (req, res, next) => {
	res.render('register')
}

export const userView = (req, res, next) => {
	res.render('')
}

export const loginView = (req, res) => {

}

export const newUser = (req, res) => {
	const { username, name, surname, password } = req.body
	res.redirect(`/login?username=${username}`)
}

export const login = (req, res) => {
	if (isValue(req.query.username)) {
		
	}
	res.redirect('/home')
}

const isValue = (val: any): boolean => {
	return !(val === undefined || val === null || val.length <= 0);
}