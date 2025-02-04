import mongoose from "mongoose";

const {Schema} = mongoose

const DoctorSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Doctor name is required'],
        trim: true,
        minLength: [5, 'Doctor name must be at least 5 characters long'],
        match: [/^[a-zA-Z. ]+$/, 'Doctor name can only contain alphabetic characters, space and dot (no special characters and numbers are allowed)'],
    },
})


export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema)