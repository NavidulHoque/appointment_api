import { User } from './../models/User.js'
import jwt from 'jsonwebtoken'
import { NODE_ENV, SECRET } from './../config/config.js';

export const createUser = async (req, res) => {

    const { username, password } = req.body

    try {

        const newUser = new User({ username, password })

        await newUser.save()

        return res.status(201).json({
            message: "User created successfully"
        })
    }

    catch (error) {

        console.error(error)

        return res.status(500).json({
            message: "Server Error!!"
        })
    }
}

export const login = async (req, res) => {

    const { username } = req.body
    const { user } = req

    try {

        const { _id } = user

        const token = jwt.sign({ id: _id }, SECRET, { expiresIn: "3d" })

        return res.cookie("token", token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === "development" ? "Strict" : "None",
            maxAge: 3 * 24 * 60 * 60 * 1000
        })
        .status(200)
        .json({
            message: "Logged in successfully",
            user: {id: _id, username}
        })
    }

    catch (error) {

        console.error(error)

        return res.status(500).json({
            message: "Server Error!!"
        })
    }
}

export const logout = async (req, res) => {

    try {
        return res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json({ message: "Logged out successfully" })
    }

    catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Server Error!!"
        })
    }
}

