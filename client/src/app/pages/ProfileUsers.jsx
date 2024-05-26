import { useDispatch, useSelector } from 'react-redux'
import LayoutApp from '../LayoutApp'
import { Col, Descriptions, Form, Input, Row, Select, message } from 'antd'
import { useState } from 'react'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import axios from 'axios'


const ProfileUsers = () => {
    const { user } = useSelector(state => state.user)

    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()

    const handleUpdateUsers = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8082/api/v1/users/updateUser',
                {
                    ...values,
                    userId: user?.user_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (res.data.success) {
                message.success(res.data.message)
                setUpdate(false)        
                setTimeout(() => {
                    dispatch(hideLoading())
                    window.location.reload()
                }, 1000);
            } else {
                dispatch(hideLoading())
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("Something went wrong")
        }
    } 

    const profile = [
        {
            key: '1',
            label: 'First Name',
            children: user?.user_first_name
        },
        {
            key: '2',
            label: 'Last Name',
            children: user?.user_last_name
        },
        {
            key: '3',
            label: 'E-mail',
            children: user?.user_email
        },
        {
            key: '4',
            label: 'No Phone',
            children: user?.user_phone
        },
        {
            key: '5',
            label: 'Gender',
            children: user?.user_gender
        },
        
    ]
    return (
        <LayoutApp>
            <div>Profil User</div>

            {
            update ? user && (
                <Form layout="vertical" className="m-4 w-100"
                    size="large"
                    onFinish={handleUpdateUsers}
                    initialValues={{
                        ...user
                    }}
                >
                    <h3>Personal Details:</h3>
                    <Row gutter={20} className="w-100">
                        
                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="Fist Name"
                                name="user_first_name"
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter your first name !"
                                    }
                                ]}
                            >
                                <Input type="text" placeholder="Enter your name"/>
                            </Form.Item>
                        </Col>
                            
                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                name="user_last_name"
                                label="Last Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input your Last name !'
                                    }
                                ]}
                            >
                                <Input type="text" placeholder='Enter your Last name'/>
                            </Form.Item>
                        </Col>
                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="E-mail"
                                name="user_email"
                                status='warning'
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The Input is not valid E-mail !'
                                    },
                                    {
                                        required: true,
                                        message: 'Please Input your E-mail !'
                                    }
                                ]}
                            >
                                <Input 
                                    placeholder='Enter your E-mail'  
                                />
                            </Form.Item>
                        </Col>

                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label= "Phone No"
                                name="user_phone"
                                rules={[
                                    {
                                        min: 10,
                                        max: 10,
                                        required: true,
                                        message: 'Please Input your phone number !'
                                    }
                                ]}
                            >
                                <Input placeholder='Enter your Phone number' />
                            </Form.Item>
                        </Col>

                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="Gender"
                                name="user_gender"
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: "male",
                                            label: 'Male',
                                        },
                                        {
                                            value: 'female',
                                            label: 'Female',
                                        },
                                        {
                                            value: 'autre',
                                            label: 'Autre',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                        <Col md={24} lg={8} className="w-100"></Col>
                        <Col md={24} lg={8} className="w-100">
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <button className="btn btn-primary w-50" 
                                >
                                    Appliquer
                                </button>
                            </div>
                            
                        </Col>
                    </Row>
                </Form>
            ) : (
                <>
                    <Descriptions title="User Info" layout='vertical' items={profile} bordered/>
                    <div className="d-flex align-items-center justify-content-center">
                        <button className="btn btn-primary w-25 mt-3"
                            onClick={() => setUpdate(true)}
                        >
                            Update
                        </button>
                    </div>
                </>
                
            )
        }
        </LayoutApp>
    )
}

export default ProfileUsers