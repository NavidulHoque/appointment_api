import express from 'express'
import { createUser, login } from '../controller/auth.js'
import { registrationErrorHandler, loginErrorHandler } from '../middleware/auth.js'

const authRouter = express.Router()

authRouter.post("/registration", registrationErrorHandler, createUser)

authRouter.post("/login", loginErrorHandler, login)

export default authRouter