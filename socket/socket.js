console.log("Hello via Bun!");
const { Server } = require('socket.io')

const io = new Server({ cors: "http://localhost:5173/" })

let onlineUsers = []

io.on("connection", (socket) => {
    console.log("new connection ", socket.id)

    // listen to a connection
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })

        console.log("Online users: ", onlineUsers)
        io.emit("getOnlineUsers", onlineUsers)
    })

    // Add message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = onlineUsers.find(user => user.userId === receiverId)
        
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        // console.log("Online users: ", onlineUsers)
        io.emit("getOnlineUsers", onlineUsers)
    })
})

io.listen(3000)