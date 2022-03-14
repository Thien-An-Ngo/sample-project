import UserRepo from "../repositories/userRepository"
import User from '../models/user'

export const getUser = (req, res) => {
	UserRepo.getUserByUsername()
}