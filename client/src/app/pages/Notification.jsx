import { Avatar, List, Tabs, message } from "antd"
import LayoutApp from "../LayoutApp"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { hideLoading, showLoading } from "../../redux/features/alertSlice"

const Notification = () => {
    const { user } = useSelector(state => state.user)
    const navigate =useNavigate()
    const dispatch = useDispatch()
    
    const handleMarkedAll = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8082/api/v1/users/marked-read-all-notifications',
                { user_id: user.user_id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (res.data.success) {
                message.success(res.data.message)
                setTimeout(() => {
                    dispatch(hideLoading())
                    window.location.reload()
                }, 1000);
            } else {
                dispatch(hideLoading())
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            message.error("Something went wrong")
            dispatch(hideLoading())
        }
    }

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading())
                const res = await axios.post('http://localhost:8082/api/v1/users/delete-all-notifications-read',
                    { user_id: user.user_id },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )

                if(res.data.success) {
                    message.success(res.data.message)
                    setTimeout(() => {
                        dispatch(hideLoading())
                        window.location.reload()
                    }, 1000);
                } else {
                    message.error(res.data.message)
                    dispatch(hideLoading())
                }
        } catch (error) {
            console.log(error)
            message.error("Something went wrong")
        }
    }

    return (
        <LayoutApp>
            <h3>Welcome Notification</h3>
            <Tabs>
                <Tabs.TabPane tab="Unread" key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2 text-primary cp"
                            style={{cursor: 'pointer'}}
                            onClick={handleMarkedAll}
                        >
                            Marked All read
                        </h4>
                    </div>
                    {    user && user.user_notification &&
                        JSON.parse(user.user_notification).map((notificationMsg, i) => (
                            <List key={i} itemLayout="horizontal">
                                <List.Item key={i} className="border-bottom"
                                style={{cursor:'pointer',}}
                                    onClick={() => navigate('/hello-world/doctor')}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar>{notificationMsg.message.charAt(31)}</Avatar>}
                                        title={notificationMsg.type}
                                        description={notificationMsg.message}
                                    />
                                </List.Item>
                            </List>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={2}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-4 text-danger"
                            style={{cursor: 'pointer'}}
                            onClick={handleDeleteAllRead}
                        >
                            Delete All Read
                        </h4>
                    </div>
                    {
                        user && user.user_seen_notification &&
                        JSON.parse(user.user_seen_notification).map((notificationMsg, i) => (
                            <List key={i} itemLayout="horizontal">
                                <List.Item key={i} className="border-bottom"
                                style={{cursor:'pointer',}}
                                    onClick={() => navigate('/hello-world/doctor')}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar>{notificationMsg.message.charAt(31)}</Avatar>}
                                        title={notificationMsg.type}
                                        description={notificationMsg.message}
                                    />
                                </List.Item>
                            </List>
                        ))
                    }
                </Tabs.TabPane>
                
            </Tabs>
        </LayoutApp>
    )
}

export default Notification