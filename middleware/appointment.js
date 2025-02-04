import { Appointment } from "../models/Appointment.js"
import { Doctor } from './../models/Doctor.js';


export const appointmentErrorHandler = async (req, res, next) => {
    
    const { patientName, contactInformation, date, time, doctorId } = req.body
    const {id} = req.params

    try {

        const appointment = await Appointment.findById(id)

        if(!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            })
        }

        const doctor = await Doctor.findById(doctorId)

        if(!doctor) {
            return res.status(404).json({
                message: "Doctor is not valid"
            })
        }




        
    } 
    
    catch (error) {
        
    }
}