import UserRepo from "../repositories/userRepository"

export const getUser = async (req, res) => {
	const user = await UserRepo.getUserByUsername(<string>req.query.username)
	res.status(200)
	return res.json({user: user})
}