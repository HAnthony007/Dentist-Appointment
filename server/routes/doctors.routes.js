const express = require('express')
const router = express.Router()
const doctorsController = require('../controllers/doctors.controller')
const authentificationMiddlewares = require('../middlewares/authentificationMiddlewares')

//Post single Info || DOCTOR || POST
router.post('/getDoctorInfo', authentificationMiddlewares, doctorsController.getDoctorInfoController)

//Update profile doctor || POST
router.post('/updateProfile', authentificationMiddlewares, doctorsController.updateProfileController)

router.post('/getDoctorById', authentificationMiddlewares, doctorsController.getDoctorByIdController)

router.post('/doctorAppointment', authentificationMiddlewares, doctorsController.doctorAppointmentsController)

router.post('/updateStatus', authentificationMiddlewares, doctorsController.updateStatusController)

module.exports = router