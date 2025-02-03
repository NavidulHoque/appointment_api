import express from 'express'
import { createDoctor } from '../controller/doctor.js'

const doctorRouter = express.Router()

doctorRouter.post("/", createDoctor)

export default doctorRouter