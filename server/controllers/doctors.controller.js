const { query } = require('../config/db.config')


const getDoctorInfoController = async (req, res) => {
    const { user_id } = req.body
    try {
        const [doctors] = await query('SELECT * FROM DOCTORS WHERE user_id = ?',[user_id])
        res.status(200).send({
            success: true,
            message: 'Doctor data fetched successfully',
            data: doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Fetching Doctor Details",
            error
        })
    }
}

const updateProfileController = async (req, res) => {
    const { user_id, doctor_first_name, doctor_last_name, doctor_email, doctor_phone, doctor_website, doctor_address, doctor_specialization, doctor_experience, doctor_fees_per_consultation, timings } = req.body
    const timingString = JSON.stringify(timings)
    try {
        const doctor = await query('UPDATE DOCTORS SET doctor_first_name =?, doctor_last_name =?, doctor_email =?, doctor_phone =?, doctor_website =?, doctor_address =?, doctor_specialization =?, doctor_experience =?, doctor_fees_per_consultation =?, timings =? WHERE user_id =?', [doctor_first_name, doctor_last_name, doctor_email, doctor_phone, doctor_website, doctor_address, doctor_specialization, doctor_experience, doctor_fees_per_consultation, timingString, user_id])

        res.status(201).send({
            success: true,
            message: "Doctor Profile updated successfully",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Doctor Profile update Issue",
            error
        })
    }
}

const getDoctorByIdController = async (req, res) => {
    try {
        const [doctor] = await query('SELECT * FROM DOCTORS WHERE doctor_id =? LIMIT 1', [req.body.doctorId])
        console.log(doctor)
        res.status(201).send({
            success: true,
            message: "Single Doctor Info fetched",
            data: doctor
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

const doctorAppointmentsController = async (req, res) => {
    try {
        const [doctor] = await query('SELECT * FROM DOCTORS WHERE user_id =?', [req.body.userId])
        const appointments = await query('SELECT * FROM LIST_APPOINTMENT INNER JOIN TREATMENT ON LIST_APPOINTMENT.treatment_id = TREATMENT.treatment_id WHERE LIST_APPOINTMENT.doctor_id =? AND LIST_APPOINTMENT.status =?', [doctor.doctor_id, "approved"])
        const listAppointments = await query('SELECT * FROM LIST_APPOINTMENT INNER JOIN TREATMENT ON LIST_APPOINTMENT.treatment_id = TREATMENT.treatment_id WHERE LIST_APPOINTMENT.doctor_id =?', [doctor.doctor_id])

        res.status(200).send({
            success: true,
            message: "Doctor Appointments Fetch successfully",
            data: appointments,
            listAppointments: listAppointments
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Doctor appointments",
            error
        })
    }
}

const updateStatusController = async (req, res) => {
    try {
        const { appointmentId, status } = req.body

        const [appointment] = await query('SELECT * FROM LIST_APPOINTMENT WHERE appointment_id = ?', [appointmentId])

        await query('UPDATE LIST_APPOINTMENT SET status =? WHERE appointment_id =?', [status, appointmentId])

        const [user] = await query('SELECT * FROM USERS WHERE user_id =?', [appointment.user_id])

        const existingNotifications = JSON.parse(user.user_notification || '[]')

        const newNotification = {
            type: 'Status-Updated',
            message: `Your appointment has been updated ${status}`,
            onClickPath: '/benify/appointment'
        }

        const updatedNotification = JSON.stringify(existingNotifications.concat(newNotification))

        await query('UPDATE USERS SET user_notification =? WHERE user_id =?', [updatedNotification, user.user_id])

        res.status(200).send({
            success: true,
            message: 'Appointment Status updated successfully'
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Error in update status",
            error
        })
    }
}

module.exports = {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentsController,
    updateStatusController
}