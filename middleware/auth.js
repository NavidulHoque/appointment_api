import { SECRET } from "../config/config.js"
import { User } from "../models/User.js"
import jwt from 'jsonwebtoken';

export const registrationErrorHandler = async (req, res, next) => {

    const { username } = req.body

    try {

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({
                message: "Username already exists, please try another name"
            })
        }

        next()
    } 
    
    catch (error) {
        next(error)
    }
}

export const loginErrorHandler = async (req, res, next) => {

    const { username, password } = req.body

    try {

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).json({
                message: "Username invalid, create an account first"
            })
        }

        const isMatched = await user.comparePassword(password, user.password)

        if (!isMatched) {
            return res.status(400).json({
                message: "Password invalid"
            })
        }

        req.user = user

        next()
    }

    catch (error) {

        next(error)
    }
}

export const protect = async (req, res, next) => {

    const token = req.headers.Authorization

    if (!token) {
        return res.status(400).json({
            message: "No token provided, please login"
        })
    }

    jwt.verify(token, SECRET, async (err) => {

        if (err) {

            if (err.name === "TokenExpiredError") {

                return res.status(400).json({
                    message: "Token expired, please login again"
                })
            }

            else if (err.name === "JsonWebTokenError") {

                return res.status(400).json({
                    message: "Invalid token, please login again"
                }) 
            }

            else if (err.name === "NotBeforeError") {

                return res.status(400).json({
                    message: "Token not active yet, please login again"
                })
            }
        }

        next()
    })
}