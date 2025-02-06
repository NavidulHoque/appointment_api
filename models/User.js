import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const {Schema} = mongoose

const UserSchema = new Schema({

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, "Username already exists"],
        trim: true,
        minLength: [5, 'Username must be at least 5 characters long'],
        maxLength: [10, 'Username cannot exceed 10 characters'],
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters (no special characters and space are allowed)'],
    },
    
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long'],
        match: [
            /^(?=.*\d)(?=.*[\W_]).{8,}$/,
            'Password must contain at least one number and one special character',
        ],
    },

},{timestamps: true})


UserSchema.pre('save', async function(next) {

    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
    next()
})


UserSchema.methods.comparePassword = async function(plainPassword, hashedPassword) {

    const isMatched = await bcrypt.compare(plainPassword, hashedPassword)

    return isMatched
}

export const User = mongoose.models.User || mongoose.model('User', UserSchema)