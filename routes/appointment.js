import express from 'express'
import { createAppointment, getAllAppointments, getAnAppointment, updateAppointment, deleteAppointment } from '../controller/appointment.js'

const appointmentRouter = express.Router()

appointmentRouter.post("/", createAppointment)

appointmentRouter.get("/", getAllAppointments)

appointmentRouter.get("/:id", getAnAppointment)

appointmentRouter.put("/:id", updateAppointment)

appointmentRouter.delete("/:id", deleteAppointment)

export default appointmentRouter