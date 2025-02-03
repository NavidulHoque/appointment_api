import { SECRET } from "../config/config.js"
import { User } from "../models/User.js"

export const registrationErrorHandler = async (req, res, next) => {

    const { username, password } = req.body

    try {

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and Password are required"
            })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({
                message: "Username already exists, try another one"
            })
        }

        if (username.length < 5 || username.length > 10) {
            return res.status(400).json({
                message: "Username must be between 5 to 10 characters long"
            })
        }

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            return res.status(400).json({
                message: "Username can only contain alphanumeric characters (no special characters and space are allowed)"
            })
        }

        next()
    }

    catch (error) {

        console.error(error)

        return res.status(500).json({
            message: "Server Error!!"
        })
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

        console.error(error)

        return res.status(500).json({
            message: "Server Error!!"
        })
    }
}

export const protect = async (req, res, next) => {

    const token = req.cookies.token

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

            return res.status(400).json({
                message: "Invalid token, please login again"
            })
        }

        next()
    })
}