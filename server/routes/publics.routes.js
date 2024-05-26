const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controller')
const publicsController = require('../controllers/publics.controller')

router.get('/getAllDoctorPublics', userController.getAllDoctorController)

router.post('/getDoctorById', publicsController.getDoctorByIdController )

module.exports = router