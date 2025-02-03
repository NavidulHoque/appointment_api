import express from 'express'
import cookieParser from 'cookie-parser'
import connectDatabase from './config/connectDatabase.js'
import { PORT } from './config/config.js'
import authRouter from './routes/auth.js'
import doctorRouter from './routes/doctor.js'
import appointmentRouter from './routes/appointment.js'


const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/doctors', doctorRouter)
app.use('/appointments', appointmentRouter)


async function startServer() {

    await connectDatabase()

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startServer()