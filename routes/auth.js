import express from 'express'
import { createUser, login, logout } from '../controller/auth.js'

const authRouter = express.Router()

authRouter.post("/registration", createUser)

authRouter.post("/login", login)

authRouter.get("/logout", logout)

export default authRouter