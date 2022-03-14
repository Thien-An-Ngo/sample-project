import express from "express"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.join(__dirname, "../", ".env")})

import dbService from "./services/databaseService"
import userRoutes from "./routes/userRoutes"

const app = express()

app.listen(process.env.EXPRESS_APP_PORT, async () => {
	// dbService.restartDB()
	dbService.startDB()
	console.log(`Backend listening on port http://localhost:${process.env.EXPRESS_APP_PORT}`)
})

app.disable("x-powered-by")

// index
app.get('/', (req, res) => {
	res.json({"msg": "success"})
})

// routes
app.use("/api/", userRoutes)

//default for all routes
app.use((req, res) => {
	res.status(404);
});

app.use(cors())
app.use((req, res, next) => {

	next()
})