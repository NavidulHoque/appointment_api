import express from 'express'
import { createAppointment, getAllAppointments, getAnAppointment, updateAppointment, deleteAppointment } from '../controller/appointment.js'
import { protect } from '../middleware/auth.js'
import { appointmentErrorHandler } from '../middleware/appointment.js'

const appointmentRouter = express.Router()

appointmentRouter.post("/", protect, createAppointment)

appointmentRouter.get("/", protect, getAllAppointments)

appointmentRouter.get("/:id", protect, getAnAppointment)

appointmentRouter.put("/:id", protect, appointmentErrorHandler, updateAppointment)

appointmentRouter.delete("/:id", protect, deleteAppointment)

export default appointmentRouter