import { useEffect, useState } from "react"
import LayoutApp from "../LayoutApp"
import MenuChat from "./MenuChat"
import NavChat from "./NavChat"

import { io } from 'socket.io-client'
import { useSelector } from "react-redux"
import Message from './Message';

const Chat = () => {
    const { user } = useSelector(state => state.user)

    const [currentChat, setCurrentChat] = useState([])
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [message, setMessage] = useState([])
    const [newMessage, setNewMessage] = useState([])

    useEffect(() => {
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [user])

    //Add online users
    useEffect(() => {
        if (socket === null) return

        socket.emit('addNewUser', user?.user_id)

        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })

        return () => {
            socket.off("getOnlineUsers")
        }
    }, [socket])
    
    return (

        <LayoutApp>
            <MenuChat setCurrentChat={setCurrentChat} currentChat={currentChat} onlineUsers={onlineUsers}/>
            <div className="w-100 overflow-auto">
                <NavChat currentChat={currentChat}/>
                <Message currentChat={currentChat} Message={message} setMessage={setMessage} newMessage={newMessage} setNewMessage={setNewMessage}/>
            </div>
        </LayoutApp>

    )
}

export default Chat