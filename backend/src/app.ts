import express from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../', '.env') })
import dbService from './services/databaseService'
import userRoutes from './routes/userAPIRoutes'
import commonRoutes from './routes/routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../resources/templates'))

app.disable('x-powered-by')

// index
app.get('/api', (req, res) => {
	res.json({ 'msg': 'success' })
})

// routes
app.use('/api/user', userRoutes)
app.use('/', commonRoutes)
app.use(cors())
app.use(express.json())

// index
app.get('/api', (req, res) => {
	res.json({ msg: 'success' })
})

// routes
app.use('/api/user', userRoutes)

//default for all routes
app.use((req, res) => {
	res.status(404)
})

// Fallback port: 3000
const PORT = process.env.EXPRESS_APP_PORT || 8000

app.listen(PORT, async () => {
	// dbService.restartDB()
	dbService.startDB()
	console.log(`Backend listening on port http://localhost:${PORT}`)
})