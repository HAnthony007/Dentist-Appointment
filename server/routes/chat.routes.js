const express = require('express')
const router = express.Router()
const authentificationMiddlewares = require('../middlewares/authentificationMiddlewares')
const chatController = require('../controllers/chat.controller')

router.post('/create-chat', authentificationMiddlewares, chatController.CreateChat)

router.post('/find-user-chats', authentificationMiddlewares, chatController.findUserChats)

router.get('/find-chat', authentificationMiddlewares, chatController.findChat)

router.post('/create-message', authentificationMiddlewares, chatController.createMessage)

router.post('/get-message', authentificationMiddlewares, chatController.getMessage)

module.exports = router