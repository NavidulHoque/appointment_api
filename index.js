import express from 'express'
import connectDatabase from './config/connectDatabase.js'
import { PORT } from './config/config.js'
import authRouter from './routes/auth.js'
import doctorRouter from './routes/doctor.js'
import appointmentRouter from './routes/appointment.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/doctors', doctorRouter)
app.use('/appointments', appointmentRouter)

// 404 handler
app.use((req, res, next) => {
    return res.status(404).json({
        message: "The requested resource was not found!",
    })
})

app.use(errorHandler);

async function startServer() {

    await connectDatabase()

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startServer()