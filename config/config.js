import dotenv from "dotenv"

dotenv.config()

export const MONGODB_URL = process.env.MONGODB_URL

export const PORT = Number(process.env.PORT)

export const SECRET = process.env.SECRET

export const NODE_ENV = process.env.NODE_ENV
