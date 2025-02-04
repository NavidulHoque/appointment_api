import { Appointment } from "../models/Appointment.js"


export const createAppointment = async (req, res, next) => {

    const { patientName, contactInformation, date, time, doctorId } = req.body

    try {

        const appointment = await Appointment.create({ patientName, contactInformation, date, time, doctorId })
        
        const populatedAppointment = await appointment.populate("doctorId", "name");

        const { _id } = populatedAppointment

        return res.status(201).json({
            appointment: {
                id: _id,
                patientName,
                contactInformation,
                date,
                time,
                doctor: {
                    id: doctorId,
                    name: populatedAppointment.doctorId.name
                }
            },
            message: "Appointment created successfully"
        })
    }

    catch (error) {

        next(error)
    }
}

export const getAllAppointments = async (req, res, next) => {

    try {

        const appointments = await Appointment.find()
            .populate("doctorId")
            .lean() // Convert the document to a plain JavaScript object which optimizes the performance

        const formattedAppointments = appointments.map(({ _id, patientName, contactInformation, date, time, doctorId }) => ({
            id: _id,
            patientName,
            contactInformation,
            date,
            time,
            doctor: {
                id: doctorId._id,
                name: doctorId.name,
            },
        }));

        return res.status(200).json({
            appointments: formattedAppointments
        })
    }

    catch (error) {

        next(error)
    }
}

export const getAnAppointment = async (req, res, next) => {

    const { id } = req.params

    try {

        const appointment = await Appointment.findById(id)
            .populate("doctorId")
            .lean()

        const { patientName, contactInformation, date, time, doctorId } = appointment

        return res.status(200).json({
            appointment: { id, patientName, contactInformation, date, time, doctor: { id: doctorId._id, name: doctorId.name } }
        })
    }

    catch (error) {

        next(error)
    }
}

export const updateAppointment = async (req, res, next) => {

    const { id } = req.params
    const { patientName, contactInformation, date, time, doctorId } = req.body

    try {

        const appointment = await Appointment.findByIdAndUpdate(id, {
            patientName,
            contactInformation,
            date,
            time,
            doctorId
        },
        { new: true })

        return res.status(200).json({
            appointment,
            message: "Appointment updated successfully"
        })
    }

    catch (error) {

        next(error)
    }
}

export const deleteAppointment = async (req, res, next) => {

    const { id } = req.params

    try {

        const appointment = await Appointment.findOne({_id: id})

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            })
        }

        await Appointment.findByIdAndDelete(id)

        return res.status(200).json({
            message: "Appointment deleted successfully"
        })
    }

    catch (error) {

        next(error)
    }
}
