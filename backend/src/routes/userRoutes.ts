import express from "express"
import {getUser, newUser} from "../controllers/authController"

const router = express.Router()

router.get("/get", getUser)
router.post("/new", newUser)

export default router