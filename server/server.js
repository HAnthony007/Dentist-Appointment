const express = require('express')
const colors = require('colors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const figlet = require('figlet')
const io = require('socket.io')(8090, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

const adminsRoutes = require('./routes/admins.routes')
const doctorsRoutes = require('./routes/doctors.routes')
const usersRoutes = require('./routes/users.routes')
const publicsRoutes = require('./routes/publics.routes')
const chatsRoutes = require('./routes/chat.routes')


const app = express()
const port = process.env.PORT || 8082

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

dotenv.config()

//Permission BD
app.use(cors())

io.on('connection', (socket) => {
    console.log('User connected: ', socket.id)
    // socket.on('addUser', (userId) => {
    //     socket.userId = userId
    // })
    // io.emit('getUsers', socket.userId)
})


// Routes
app.use('/api/v1/admins', adminsRoutes)
app.use('/api/v1/doctors', doctorsRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/publics', publicsRoutes)
app.use('/api/v1/chats', chatsRoutes)


app.listen(port, () => {
    console.log(figlet.textSync("Bun! Vite! React"))
    console.log(`Hacking NASA running on port ${port}`.bgMagenta.black)
})