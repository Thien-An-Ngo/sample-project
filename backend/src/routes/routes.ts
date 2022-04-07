import express from 'express'
import { homeView, newUser, newUserView, registerView, userView } from '../views/userViews'

const router = express.Router()

router.get('/', (_, res) => res.redirect('/home'))
router.get('/home', homeView)
router.get('/user', userView)
router.get('/register', registerView)
router.get('/login', loginView)
router.get('/user/login', login)
router.post('/user/new', newUser)

export default router