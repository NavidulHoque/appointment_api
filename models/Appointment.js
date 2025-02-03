import mongoose from "mongoose";

const {Schema} = mongoose

const AppointmentSchema = new Schema({

    patientName: {
        type: String,
        required: [true, 'Patient Name is required'],
        trim: true,
        minLength: [5, 'Patient Name must be at least 5 characters long'],
        match: [/^[a-zA-Z ]+$/, 'Patient Name can only contain alphabetic characters and space (no special characters and numbers are allowed)'],
    },
    
    contactInformation: {
        type: String,
        required: [true, 'Patient Contact Information is required'],
        match: [/^\d{11}$/, 'Patient Contact Information must be exactly 11 digits'],
    },

    date: {
        type: String,
        default: () => new Date().toDateString()
    },

    time: {
        type: String,
        default: () => new Date().toLocaleString()
    }
})


export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema)