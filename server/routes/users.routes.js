const express = require('express')
const router = express.Router()

const userController = require('../controllers/users.controller')
const authentificationMiddlewares = require('../middlewares/authentificationMiddlewares')

//List of user || GET
router.get('/list_users', userController.getAllUsers)

router.get('/getAllUsers', authentificationMiddlewares, userController.getAllUserController)

router.post('/getUsersById', authentificationMiddlewares, userController.getUsersById)

//Register || POST
router.post('/register', userController.addUsers)

//Login || POST
router.post('/login', userController.usersLogin)

//Authentication || POST
router.post('/authentication', authentificationMiddlewares, userController.authController)

//Apply Doctor || POST
router.post('/apply-doctor', authentificationMiddlewares, userController.applyDentistController)

//Notification || POST
router.post('/marked-read-all-notifications', authentificationMiddlewares, userController.markedReadAllNotificationController)

//Delete all notifications || POST
router.post('/delete-all-notifications-read', authentificationMiddlewares, userController.deleteNotificationsRead)


//All doctor || POST
router.get('/getAllDoctor', authentificationMiddlewares, userController.getAllDoctorController)

router.post('/bookingAvaibility', authentificationMiddlewares, userController.bookingAvaibilityController)

router.post('/bookAppointment', authentificationMiddlewares, userController.bookingAppointmentController)

router.post('/userAppointment', authentificationMiddlewares, userController.userAppointmentController)

router.post('/updateUser', authentificationMiddlewares, userController.updateUser)

router.get('/getAllTreatment', authentificationMiddlewares, userController.getAllTreatmentController)

module.exports = router