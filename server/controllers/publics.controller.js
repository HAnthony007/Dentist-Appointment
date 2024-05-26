const { query } = require('../config/db.config')

const getDoctorByIdController = async (req, res) => {
    try {
        const [doctor] = await query('SELECT * FROM DOCTORS, users WHERE DOCTORS.doctor_id =? LIMIT 1', [req.body.doctorId])
        const [users] = await query('SELECT * FROM USERS WHERE user_id =?', [doctor.user_id])
        res.status(201).send({
            success: true,
            message: "Single Doctor Info fetched",
            doctor: doctor,
            user: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Single doctor info",
            error
        })
    }
}

module.exports = {
    getDoctorByIdController
}