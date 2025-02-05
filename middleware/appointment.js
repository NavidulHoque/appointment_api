import { Appointment } from "../models/Appointment.js"
import { Doctor } from './../models/Doctor.js';


export const appointmentErrorHandler = async (req, res, next) => {

    const { date, time, doctorId } = req.body
    const { id } = req.params

    try {

        const appointment = await Appointment.findOne({ _id: id })

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            })
        }

        const doctor = await Doctor.findOne({ _id: doctorId })

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            })
        }

        const fullDateTimeString = `${date} ${time}`;
        const appointmentDateTime = new Date(fullDateTimeString);

        const currentDateTime = new Date();

        if (appointmentDateTime < currentDateTime) {
            return res.status(400).json({
                message: "Appointment time must be in the future."
            })
        }

        next()
    }

    catch (error) {
        next(error)
    }
}