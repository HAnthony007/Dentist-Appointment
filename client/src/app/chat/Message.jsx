import { Button, Form, message } from "antd"
import { SendOutlined } from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea"
import { useSelector } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"
import moment from "moment"

const Message = ({ currentChat, Message, setMessage, newMessage, setNewMessage }) => {
    const { user } = useSelector(state => state.user)
    const handleSubmit = async (values) => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/chats/create-message',
                {
                    chatId: currentChat?.chatInfo?.chat_id,
                    senderId: user?.user_id,
                    message: values.message
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                message.success(res.data.message)
                setNewMessage(res.data.data)
                console.log(newMessage)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.error('Error creating message')
            message.error("Error creatting message")
        }
    }

    const getMessage = async () => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/chats/get-message',
                {
                    chatId: currentChat?.chatInfo?.chat_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setMessage(res.data.data)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.error('Error getting message')
            message.error("Error getting message")
        }
    }
    useEffect(() => {
        getMessage()
    }, [handleSubmit])


    return (
        <div className="h-100 d-flex flex-column">
            <div className="overflow-scroll border-bottom flex-grow-1 flex-shrink-1 overflow-hidden" style={{
            }}>
                <div className="h-100 auto w-100"
                    style={{
                        padding: '2rem',
                    }}
                >
                    {
                        Message.length > 0 ? (
                        Message?.map((mess) => (
                            mess.sender_id === user?.user_id ? (
                                <div className="bg-primary text-white mb-3" key={mess.message_id}
                                    style={{
                                        maxWidth: '40%',
                                        borderRadius: '.5rem .5rem 0 .5rem',
                                        marginLeft: 'auto',
                                        padding: '1rem 1rem 0 1rem',
                                    }}
                                >
                                    {mess.message}
                                    <hr className="m-0 mt-2" />
                                    <div className="w-100 text-end">
                                    {
                                        moment(mess.sending_date).isSame(moment(), 'day') ? `Today at ${moment(mess.sending_date).format('HH:mm')}` : `${moment().diff(moment(mess.sending_date), 'days')} days ago, At ${moment(mess.sending_date).format('HH:mm')}`
                                    }
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white mb-3" key={mess.message_id}
                                    style={{
                                        maxWidth: '40%',
                                        borderRadius: '0 .5rem .5rem .5rem',
                                        padding: '1rem 1rem 0 1rem',
                                    }
                                    }>
                                    {mess.message}
                                    <hr className="m-0 mt-2" />
                                    <div className="w-100 text-end opacity-50">
                                    {
                                        moment(mess.sending_date).isSame(moment(), 'day') ? `Today at ${moment(mess.sending_date).format('HH:mm')}` : `${moment().diff(moment(mess.sending_date), 'days')} days ago, At ${moment(mess.sending_date).format('HH:mm')}`
                                    }
                                    </div>
                                </div>
                            )
                        ))
                        ) : (
                            <h1>No message</h1>
                        )
                    }

                </div>
            </div>
            <div className="w-100 mt-2 sticky-bottom">
                <Form size="middle" className=" d-flex p-3 justify-content-center align-items-center"
                    style={{
                        width: '100%',
                    }}
                    onFinish={handleSubmit}

                >
                    <Form.Item className="" name="message"
                        style={{
                            width: '50%',
                            height: '100%',
                        }}
                    >
                        <TextArea autoSize showCount maxLength={200}
                            className="shadow-sm text-bg-light border-0 p-3 border-0"
                            style={{
                                width: '100%',
                                borderRadius: '5rem'
                            }}
                            placeholder="Type a message ..."
                        />
                    </Form.Item>
                    <Form.Item className="align-items-center d-flex">
                        <Button type="primary" htmlType="submit" className="" style={{ cursor: 'pointer' }}>
                            <SendOutlined className="fs-3 " style={{ cursor: 'pointer' }} />
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>


    )
}

export default Message