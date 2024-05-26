const { query } = require('../config/db.config')
const crypto = require('crypto')

// //addChat
const conversation = async (req, res) => {
    const chatId = `chatId${crypto.randomBytes(16).toString('hex')}`

    try {
        const { senderId, receiverId } = req.body

        const membre = JSON.stringify([senderId, receiverId])

        await query('INSERT INTO CHAT (`chat_id`, `members`) VALUES (?, ?)', [chatId, membre])

        res.status(200).send({
            success: true,
            message: "Chat created successful"
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Error in Creating Chat",
            error
        })
    }
}

// CreateChat     /
const CreateChat = async (req, res) => {
    const {firstId, secondId} = req.body
    const chatId = `chatId${crypto.randomBytes(16).toString('hex')}`

    try {
        const chat = await query('SELECT * FROM CHAT WHERE JSON_CONTAINS(members, JSON_ARRAY(?)) AND JSON_CONTAINS(members, JSON_ARRAY(?))', [firstId, secondId])

        if (chat.length > 0) {
            return res.status(200).send({
                success:false,
                message: 'Chat already exist',
                data: chat
            })
        }
        console.log(chat)
        const members = JSON.stringify([firstId, secondId])

        const newChat = await query('INSERT INTO CHAT (`chat_id`, `members`) VALUES (?, ?)',[chatId, members])

        res.status(200).send({
            success: true,
            message: 'Chat created successfully',
            data: newChat
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error creating chat",
            error
        })
    }
}

// Find User Chats                     /:userId
const findUserChats = async (req, res) => {
    const { userId } = req.body
    try {
        const chats = await query('SELECT * FROM CHAT WHERE JSON_CONTAINS(members, JSON_ARRAY(?))', [userId])

        res.status(200).send({
            success: true,
            message: 'User list',
            data: chats
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: 'User chat not found',
            error
        })
    }
}

// Find Chat                       /find/:firstId/:secondId
const findChat = async (req, res) => {
    const { firstId, secondId } = req.params
    try {
        const chat = await query('SELECT * FROM CHAT WHERE JSON_CONTAINS(members, JSON_ARRAY(?, ?))', [firstId, secondId])

        res.status(200).send({
            success: true,
            message: 'Chats found successfully',
            data: chat
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error finding chat",
            error
        })
    }
}


// Creating message                /
const createMessage = async (req, res) => {
    const { chatId, senderId, message } = req.body
    const messageId = `messageId${crypto.randomBytes(16).toString('hex')}`
    const sendingDate = (new Date()).toISOString()

    try {
        const newMessage = await query('INSERT INTO MESSAGE (`message_id`, `chat_id`, `sender_id`, `message`, `sending_date`) VALUES (?, ?, ?, ?, ?)', [messageId, chatId, senderId, message, sendingDate])
        res.status(200).send({
            success: true,
            message: 'Message created successfully',
            data: newMessage
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error creating message',
            error
        })
    }
}

// Get message                          /:chatId
const getMessage = async (req, res) => {
    const { chatId } = req.body
    try {
        const message = await query(`SELECT * FROM MESSAGE WHERE chat_id = ? ORDER BY STR_TO_DATE(sending_date, '%Y-%m-%dT%H:%i:%s.%fZ')`, [chatId])
        res.status(200).send({
            success: true,
            message: 'Message fetched successfully',
            data: message
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: 'Error getting message',
            error
        })
    }
}

module.exports = {
    conversation,
    CreateChat,
    findUserChats,
    findChat,
    createMessage,
    getMessage
}