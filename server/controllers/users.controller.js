const { query } = require('../config/db.config')
const jwt = require('jsonwebtoken')
const moment = require('moment/moment')
const crypto = require('crypto')

const getAllUsers = async (req, res) => {
    try {
        const rows = await query('SELECT * FROM USERS')
        res.status(200).send({
            success: true,
            message: "Registration successful",
            data: rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error
        })
    }
}

const getUsersById = async (req, res) => {
    const { userId } = req.body
    try {
        const user = await query('SELECT * FROM USERS WHERE user_id= (?)', [userId])
        res.status(200).send({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error
        })
    }
}

const addUsers = async (req, res) => {
    const { first_name, last_name, email, password, phone, gender } = req.body
    const userId = `userId${crypto.randomBytes(16).toString('hex')}`
    try {
        const existingEmail = await query('SELECT * FROM USERS WHERE user_email=?',[email])
        
        if (existingEmail.length > 0) {
            return res.status(200).send({
                success: false,
                message: 'Email already exists'
            })
        }

        const hashedPassword = await Bun.password.hash(password)

        await query('INSERT INTO USERS (`user_id`, `user_first_name`, `user_last_name`, `user_email`, `user_password`, `user_phone`, `user_gender`) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, first_name, last_name, email, hashedPassword, phone, gender])
        
        res.status(200).send({
            success: true,
            message: "Registration successful"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: `Error in addUsers: ${error.message}`
        })
    }
}

const usersLogin = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await query('SELECT * FROM USERS WHERE user_email= ?', [email])
        if (user.length === 0) {
            return res.status(200).send({
                success: false,
                message: 'Users does not exist'
            })
        }

        const isMatch = await Bun.password.verify(password, user[0].user_password)

        if (!isMatch) {
            return res.status(200).send({
                success: false,
                message: 'Invalid E-mail or Password'
            })
        }

        const token = jwt.sign(
            { id: user[0].user_id,}, 
            process.env.JWT, 
            { expiresIn: '4h'}
        )

        res.status(200).send({
            success: true,
            message: 'Login successful',
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Error in Login controller ${error.message}`
        })
    }
}

const authController = async (req, res) => {
    try {
        const [USERS] = await query('SELECT * FROM USERS WHERE user_id= ?', [req.body.user_id])
        USERS.user_password = undefined

        if(!USERS) {
            return res.status(200).send({
                success: false,
                message: 'Users does not exist'
            })
        } else {
            res.status(200).send({
                success: true,
                data: USERS
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: `Error in Auth controller ${error.message}`,
            error
        })
    }
}

//Apply Dentist Controller
const applyDentistController = async (req, res) => {
    const { user_id, first_name, last_name, email, phone, website, doctor_address, specialization, doctor_experience, doctor_fees_per_consultation, timings } = req.body
    const doctorId = `doctorId${crypto.randomBytes(16).toString('hex')}`
    const timingString = JSON.stringify(timings)
    try {
        const doctor = await query('SELECT * FROM DOCTORS WHERE user_id =?', [user_id])
        if (doctor.length > 0) {
            return res.status(200).send({
                success: false,
                message: 'Users Already Applying'
            })
        }

        const newDoctor = await query('INSERT INTO DOCTORS (`doctor_id`, `user_id`, `doctor_first_name`, `doctor_last_name`, `doctor_email`, `doctor_phone`, `doctor_website`, `doctor_address`, `doctor_specialization`, `doctor_experience`, `doctor_fees_per_consultation`, `timings`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "pending")', [doctorId, user_id, first_name, last_name, email, phone, website, doctor_address, specialization, doctor_experience, doctor_fees_per_consultation, timingString] )
        const [adminUser] = await query('SELECT * FROM USERS WHERE isAdmin = 1 LIMIT 1')

        const existingNotifications = JSON.parse(adminUser.user_notification || '[]')

        const newNotifications = {
            type: 'apply_doctor_request',
            message: `${first_name} ${last_name} Has applied for a dentist account`,
            data: {
                doctorId: newDoctor.insertId,
                name: first_name + " " + last_name,
                onClickPath: '/hello-world/admin/doctor'
            }
        }

        const updatedNotifications = existingNotifications.concat(newNotifications)
        const updatedNotificationsString = JSON.stringify(updatedNotifications)

        await query('UPDATE USERS SET user_notification= ? WHERE user_id= ?', [updatedNotificationsString, adminUser.user_id])

        res.status(200).send({
            success: true,
            message: 'Doctor Account Applied Successfully '
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while applying DENTIST controller"
        })
    }
}

const markedReadAllNotificationController = async (req, res) => {
    const { user_id } = req.body
    try {
        const [user] = await query('SELECT * FROM USERS WHERE user_id =? LIMIT 1', [user_id])
        const seenNotification = JSON.parse(user.user_seen_notification)
        const notification = JSON.parse(user.user_notification)

        seenNotification.push(...notification)
        const updatedSeenNotification = JSON.stringify(seenNotification)
        const updatedNotification = JSON.stringify([])

        await query('UPDATE USERS SET user_seen_notification =?, user_notification =? WHERE user_id =?', [updatedSeenNotification, updatedNotification, user.user_id])

        res.status(200).send({
            success: true,
            message: "All notifications marked as read",
            data: { ...user, notification: [], seenNotification: updatedSeenNotification }
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error getting all notifications"
        })
    }
}

const deleteNotificationsRead = async (req, res) => {
    const { user_id } = req.body
    try {
        const [user] = await query("SELECT * FROM USERS WHERE user_id =?", [user_id])
        
        const updatedSeenNotification = JSON.stringify([])

        const updateUser = await query("UPDATE USERS SET user_seen_notification = ? WHERE user_id =?", [updatedSeenNotification, user_id])

        if (updateUser.affectedRows > 0){
            const updatedUser =  { ...req.body, user_id: user.user_id }
            delete updatedUser.user_password

            res.status(200).send({
                success: true,
                message: "Notification deleted successfully",
                data: updateUser
            })
        } else {
            res.status(403).send({
                success: false,
                message: "User does not exist"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting notifications"
        })
    }
}


const getAllDoctorController = async (req, res) => {
    try {
        const doctors = await query(`SELECT * FROM DOCTORS WHERE status = 'approved'`)
        
        res.status(200).send({
            success: true,
            message: "Doctors list fetched successfully",
            data: doctors
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "error While fetching Doctor",
            error
        })
    }
}

const getAllUserController = async (req, res) => {
    try {
        const isDoctor = false
        const isAdmin = false

        const user = await query(`SELECT * FROM USERS WHERE isAdmin =? AND isDoctor=?`,[isAdmin, isDoctor])
        
        res.status(200).send({
            success: true,
            message: "User list fetched successfully",
            data: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "error While fetching Doctor",
            error
        })
    }
}

const bookingAvaibilityController = async (req, res) => {
    try {
        const fullTimeString = req.body.dateString
        const fullTime = moment(fullTimeString)

        const doctorId = req.body.doctorId

        const timings0 = moment(req.body.timings0, 'HH:mm').set({ year: fullTime.clone().year(), month: fullTime.clone().month(), date: fullTime.clone().date() })
        const timings1 = moment(req.body.timings1, 'HH:mm').set({ year: fullTime.clone().year(), month: fullTime.clone().month(), date: fullTime.clone().date() })

        const [treatment] = await query('SELECT * FROM TREATMENT WHERE treatment_id =?', [req.body.treatmentId])
        const treatment_timings = moment(treatment.treatment_timings, 'HH:mm')

        const EndTime = fullTime.clone().add(treatment_timings.hours(), 'hours').add(treatment_timings.minutes(), 'minutes')

        if (fullTime.clone().isBefore(timings0) || fullTime.clone().isAfter(timings1) || EndTime.isAfter(timings1) || fullTime.clone().isSameOrBefore(moment())) {
            return res.status(200).send({
                success: false, 
                message: 'Sorry This dentist is inactive at this time'
            })
        }

        const appointmentDate = fullTime.clone().toISOString()
        const ToTime = EndTime.clone().toISOString()

        const appointments = await query('SELECT * FROM LIST_APPOINTMENT WHERE doctor_id =? AND begin_time <=? AND end_time >? AND status =?', [doctorId, ToTime, appointmentDate, "approved"]
        )

        if (appointments.length > 0) {
            return res.status(200).send({
                success: false,
                message: "Appointment already Booked",
                data: appointments
            })
        }

        return res.status(200).send({
            success: true,
            message: "Appointment available"+ fullTimeString + " " + EndTime
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "error While Booking availability controller ",
            error
        })
    }
}

const bookingAppointmentController = async (req, res) => {
    const appointmentId = `appointmentId${crypto.randomBytes(16).toString('hex')}`

    try {
        const { userId, doctorId, doctorInfo, userInfo, treatmentId } = req.body
        const newStatus = "pending"
        const user_Info = JSON.stringify(userInfo)
        const doctor_Info = JSON.stringify(doctorInfo)
        const doctorUserId = doctorInfo[0]
        const userUserInfo = userInfo[0]
        // const date = moment(req.body.date, "DD-MM-YYYY").toISOString()
        // const time = moment(req.body.time, "HH:mm").toISOString()
        const fullTimeString = req.body.dateString
        const fullTime = moment(fullTimeString)

        const [treatment] = await query('SELECT * FROM TREATMENT WHERE treatment_id =?', treatmentId)
        const treatment_timings = moment(treatment.treatment_timings, 'HH:mm')

        // const endTime = moment(req.body.time, 'HH:mm').add(moment(treatment.treatment_timings, 'HH:mm').hours(), 'hours').add(moment(treatment.treatment_timings, 'HH:mm').minutes(), 'minutes').toISOString()
        const EndTime = fullTime.clone().add(treatment_timings.hours(), 'hours').add(treatment_timings.minutes(), 'minutes').toISOString()
        const beginTime = fullTime.clone().toISOString()

        await query('INSERT INTO LIST_APPOINTMENT (`appointment_id`, `user_id`, `doctor_id`, `doctor_info`, `user_info`, `treatment_id`, `status`, `begin_time`, `end_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [appointmentId, userId, doctorId, doctor_Info, user_Info, treatmentId, newStatus, beginTime, EndTime])

        const [user] = await query('SELECT * FROM USERS WHERE user_id =?', doctorUserId.user_id)

        const existingNotification = JSON.parse(user.user_notification || '[]')

        const newNotifications = {
            type: 'New-appointment-request',
            message: `A new appointment request from ${userUserInfo.user_last_name}`,
            onClickPath: '/benify/doctors/doctorAppointment'
        }

        const updateNotification = existingNotification.concat(newNotifications)
        const updatedNotificationsString = JSON.stringify(updateNotification)

        await query('UPDATE USERS SET user_notification =? WHERE user_id =?', [updatedNotificationsString, user.user_id])

        res.status(200).send({
            success: true,
            message: 'Appointment Book Successfully '
            // data : user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while booking Appointment",
            error
        })
    }
}

const userAppointmentController = async (req, res) => {
    try {
        const appointments = await query('SELECT * FROM LIST_APPOINTMENT WHERE user_id =?', [req.body.userId])
        const listAppointments = await query('SELECT * FROM LIST_APPOINTMENT INNER JOIN TREATMENT ON LIST_APPOINTMENT.treatment_id = TREATMENT.treatment_id WHERE LIST_APPOINTMENT.user_id =?', [req.body.userId])

        res.status(200).send({
            success: true,
            message: "User Appointments fetched successfully",
            data: appointments,
            listAppointments: listAppointments
        })
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success: false,
            message: "Error while user Appointment",
            error
        })
    }
}

const updateUser = async (req, res) => {
    const { userId, user_first_name, user_last_name, user_email, user_phone, user_gender} = req.body
    try {
        const USERS = await query('UPDATE USERS SET user_first_name =?, user_last_name =?, user_email =?, user_phone =?, user_gender =? WHERE user_id =?', [user_first_name, user_last_name, user_email, user_phone, user_gender, userId])
        
        res.status(201).send({
            success: true,
            message: "Users Profile updated successfully" + USERS,
            data: USERS
        })
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success: false,
            message: "Error while user Update",
            error
        })
    }
}

const getAllTreatmentController = async (req, res) => {
    try {
        const rows = await query('SELECT * FROM TREATMENT')
        res.status(200).send({
            success: true,
            message: "Treatment fetched successful",
            data: rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error
        })
    }
}

module.exports = {
    getAllUsers,
    getUsersById,
    addUsers,
    usersLogin,
    authController,
    applyDentistController,
    markedReadAllNotificationController,
    deleteNotificationsRead,
    getAllDoctorController,
    getAllUserController,
    bookingAvaibilityController,
    bookingAppointmentController,
    userAppointmentController,
    updateUser,
    getAllTreatmentController
}