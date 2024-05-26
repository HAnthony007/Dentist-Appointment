const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller')
const authentificationMiddlewares = require('../middlewares/authentificationMiddlewares')

router.get('/getAllUsers', authentificationMiddlewares, adminController.getAllUserControllers)

router.get('/getAllDoctors', authentificationMiddlewares, adminController.getAllDoctorsControllers)

router.post('/changeAccountStatus', authentificationMiddlewares, adminController.changeAccountStatusController)

module.exports = router
