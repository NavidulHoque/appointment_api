import express from 'express'
import { createDoctor } from '../controller/doctor.js'
import { protect } from '../middleware/auth.js'

const doctorRouter = express.Router()

doctorRouter.post("/", protect, createDoctor)

export default doctorRouter