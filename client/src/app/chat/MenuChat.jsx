import { Avatar, Badge, Form, Input, Typography, message } from 'antd'
import { FileSearchOutlined, SearchOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useSelector } from 'react-redux'

import '../../css/chat.css'
import { useCallback, useEffect, useState } from 'react'

const { Text, Title, Link } = Typography


const MenuChat = ({ currentChat, setCurrentChat, onlineUsers }) => {
    const { user } = useSelector(state => state.user)

    const [doctors, setDoctors] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [userChats, setUserChats] = useState([])
    const [userChatInfo, setUserChatInfo] = useState([])


    // const chatList = [
    //     {
    //         id: 0,
    //         img: 'A',
    //         name: 'Anthony',
    //         msg: 'Hello dev',
    //         time: "08:10",
    //         unread: 1,
    //         pinned: true,
    //         online: true,
    //     },
    // ]

    const getAllDoctor = async () => {
        try {
            const res = await axios.get('http://localhost:8082/api/v1/users/getAllDoctor',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getAllUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8082/api/v1/users/list_users',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                const chats = res.data.data.filter((u) => {
                    let isChatCreated = false
                    if (user.user_id === u.user_id) return false
                    if (u.isAdmin) return false
                    if (userChats) {
                        isChatCreated = userChats?.some((chat) => {
                            return (JSON.parse(chat.members)[0] === u.user_id) || (JSON.parse(chat.members)[1] === u.user_id)
                        })
                    }

                    return !isChatCreated
                })
                setAllUsers(chats)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const createChat = async (secondId) => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/chats/create-chat',
                {
                    firstId: user?.user_id,
                    secondId: secondId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.error(error)
            message.error("error creatting chat"+ secondId+" "+ user.user_id)
        }
    }

    const fetchUserChat = async () => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/chats/find-user-chats',
                {
                    userId: user?.user_id
                },
                {
                    headers: {
                        Authorization:  `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                const infoU = await Promise.all(res.data.data.map(async (chat) => {
                    const recepId = JSON.parse(chat.members).find((id) => id !== user?.user_id)
                    const DataUser = await getUserById(recepId)
                    return {
                        chatInfo: chat,
                        userInfo: DataUser
                    }
                })) 
                setUserChatInfo(infoU)
                setUserChats(res.data.data)
            }
            } catch (error) {
            console.error(error)
            message.error("Error in getting chat")
        }
    }

    const getUserById = async (recepId) => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/users/getUsersById',
            {
                userId: recepId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            
            if (res.data.success) {
                return (res.data.data)
            }

        } catch (error) {
            console.error(error)
        }
    }

    

    useEffect(() => {
        getAllDoctor()
    }, [])

    useEffect(() => {
        getAllUsers()
    }, [userChats])

    useEffect(() => {
        fetchUserChat()
    }, [userChatInfo])

    console.log(userChatInfo)
    return (
        <>
            <div style={{
                height: '100%',
                // width: 320,
                width: '30rem',
                backgroundColor: "#f9fbff",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                overflow: 'scroll'
            }}
            >
                <div className='position-sticky top-0'
                    style={{ zIndex: 999, backgroundColor: "#F8FAFF" }}
                >
                    <div className='d-flex gap-2 m-3 h-100 align-items-center'>
                        <Avatar className=''>{user?.user_last_name.charAt(0).toLocaleUpperCase()}</Avatar>
                        <div>
                            <h6 className='fw-bold m-0'>{user?.user_last_name}</h6>
                            <span>My account</span>
                        </div>
                    </div>

                    <div className='p-3' >
                        <Form>
                            <Form.Item>
                                <Input allowClear
                                    prefix={<SearchOutlined />}
                                />
                            </Form.Item>
                        </Form>
                    </div>

                    <div className='ms-3'>
                        <FileSearchOutlined />
                        <Link>Archive</Link>
                    </div>

                    <hr className='align-items-center justify-content-center d-flex ' />

                </div>

                <div style={{ margin: '0 0 0.75rem 0.75rem' }}>chat</div>

                {
                    userChatInfo.length == 0 ? (
                        <h1>No Conversation</h1>
                    ) : (
                        userChatInfo?.map((item) => (
                            <div className='ms-1 me-1 bg-white d-flex justify-content-between' key={item.chatInfo.chat_id}
                                style={{
                                    height: 60,
                                    borderRadius: '5%',
                                    marginBottom: '.75rem',
                                    cursor: 'pointer'
                                }}
                                onClick={() => updateCurrentChat(item)}
                            >  
                                <div className='d-flex align-items-center h-100 gap-3 ms-2'>
                                    <Badge dot={onlineUsers?.some((user) => user?.userId === item.userInfo[0].user_id)} 
                                        status='success' 
                                        style={{}}

                                >
                                        <Avatar shape='square'>{item.userInfo[0].user_last_name.charAt(0).toLocaleUpperCase()}</Avatar>
                                    </Badge>
                                    <div className=''>
                                        <Title level={5} >{item.userInfo[0].user_last_name}</Title>
                                        <Text >{item.msg}</Text>
                                    </div>
                                </div>
                                <div className='d-grid me-2 align-items-center'>
                                    {/* <Text>{item.time} 04:30</Text> */}
                                    {/* <Badge count={3} style={{ backgroundColor: '#52c41a' }}>
                                    </Badge> */}
                                </div>

                            </div>
                        ))
                    )
                }

                <div style={{ margin: '0 0 0.75rem 0.75rem' }}>All users</div>

                {
                    allUsers.length != 0 ? (
                        allUsers?.map((item) => (
                            <div className='ms-1 me-1 bg-white d-flex justify-content-between' key={item.user_id}
                                style={{
                                    height: 60,
                                    borderRadius: '5%',
                                    marginBottom: '.75rem',
                                    cursor: 'pointer'
                                }}
                                onClick={() => createChat(item.user_id)}
                            >
                                <div className='d-flex align-items-center h-100 gap-3 ms-2'>
                                    <Badge dot={item.online} status='success' style={{}}>
                                        <Avatar shape='square'>{item.user_last_name.charAt(0).toLocaleUpperCase()}</Avatar>
                                    </Badge>
                                    <div className=''>
                                        <Title level={5} >{item.user_last_name}</Title>
                                        {/* <Text type='secondary'>Hello World</Text> */}
                                    </div>
                                </div>
                                <div className='d-grid me-2 align-items-center'>
                                    <Text>{item.time}</Text>
                                    <Badge count={item.unread} style={{ backgroundColor: '#52c41a' }}>
                                    </Badge>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h2>No new users</h2>
                    )
                }
            </div>
        </>

    )
}

export default MenuChat