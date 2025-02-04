import { Doctor } from './../models/Doctor.js';

export const createDoctor = async (req, res, next) => {

    const { name } = req.body

    try {

        const doctor = await Doctor.create({ name })

        const { _id } = doctor

        return res.status(201).json({
            message: "Doctor created successfully",
            doctor: {id: _id, name}
        })
    }

    catch (error) {

        next(error)
    }
}