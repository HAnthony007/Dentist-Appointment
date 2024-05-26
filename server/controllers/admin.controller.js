const { query } = require('../config/db.config')

const getAllUserControllers = async (req,  res) => {
    try {
        const users = await query("SELECT * FROM USERS")
        
        res.status(200).send({
            success: true,
            message: "User data",
            data: users
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Error while fetching users",
            error
        })
    }
}

const getAllDoctorsControllers = async (req, res) => {
    try {
        const doctors = await query("SELECT * FROM DOCTORS")
        
        res.status(200).send({
            success: true,
            message: "Doctor data",
            data: doctors
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Error while fetching doctors",
            error
        })
    }
}

const changeAccountStatusController = async (req, res) => {
    const { doctor_id, id_user, status } = req.body
    try {
        const doctor = await query('UPDATE DOCTORS SET status =? WHERE doctor_id =?', [status, doctor_id])
        const [user] = await query('SELECT * FROM USERS WHERE user_id =?', [id_user])

        const existingNotifications = JSON.parse(user.user_notification || '[]')

        const newNotifications = {
            type: 'doctor-account-request-updated',
            message: `Your Doctor account has been updated to ${status}`,
            onClickPath: '/hello-world/...'
        }

        const updatedNotifications = existingNotifications.concat(newNotifications)
        const updatedNotificationsString = JSON.stringify(updatedNotifications)

        const idDoctorApproved = (status === "approved") ? true : false

        await query('UPDATE USERS SET user_notification =?, isDoctor =? WHERE user_id =?', [updatedNotificationsString, idDoctorApproved, user.user_id])

        res.status(201).send({
            success: true,
            message: "Account status Updated successfully",
            data: doctor
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Error in account status" ,
            error
        })
    }
}

module.exports = {
    getAllUserControllers,
    getAllDoctorsControllers,
    changeAccountStatusController
}