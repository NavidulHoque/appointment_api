import { User } from './../models/User.js'
import jwt from 'jsonwebtoken'
import { SECRET } from './../config/config.js';

export const createUser = async (req, res, next) => {

    const { username, password } = req.body

    try {

        const newUser = new User({ username, password })

        await newUser.save()

        return res.status(201).json({
            message: "User created successfully"
        })
    }

    catch (error) {

        next(error)
    }
}

export const login = async (req, res) => {

    const { username } = req.body
    const { user } = req
    const { _id } = user

    const token = jwt.sign({ id: _id }, SECRET, { expiresIn: "7d" })

    return res.status(200).json({
        message: "Logged in successfully",
        user: { id: _id, username },
        token
    })
}

