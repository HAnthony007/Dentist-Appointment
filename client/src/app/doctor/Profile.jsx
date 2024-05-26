import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Avatar, Col, Descriptions, Form, Input, Row, Select, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import LayoutApp from '../LayoutApp';

import { specializations } from '../data/MenuList';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';

const Profile = () => {
    const { user } = useSelector(state => state.user)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)
    const [doctors, setDoctors] = useState(null)

    const handleUpdateDentist = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8082/api/v1/doctors/updateProfile',
                {
                    ...values,
                    timings: [
                        dayjs(values.timings[0].$d).format("HH:mm"),
                        dayjs(values.timings[1].$d).format("HH:mm")
                    ],

                    user_id: user.user_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                setUpdate(false)                                                    
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("Something went wrong")
        }
    }

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/doctors/getDoctorInfo',
                { user_id: params.id },
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
            console.log(error)

        }
    }

    useEffect(() => {
        getDoctorInfo()
    }, [])
    const a =((doctors?.doctor_last_name) + " ")
    const date0 = doctors && doctors.timings && JSON.parse(doctors.timings)[0]
    const date1 = doctors && doctors.timings && JSON.parse(doctors.timings)[1]

    const profile = [
        {
            key: '1',
            label: 'First Name',
            children: doctors?.doctor_first_name
        },
        {
            key: '2',
            label: 'Last Name',
            children: doctors?.doctor_last_name
        },
        {
            key: '3',
            label: 'E-mail',
            children: doctors?.doctor_email
        },
        {
            key: '4',
            label: 'No Phone',
            children: doctors?.doctor_phone
        },
        {
            key: '5',
            label: 'Website',
            children: doctors?.doctor_website
        },
        {
            key: '6',
            label: 'Address',
            children: doctors?.doctor_address
        },
        
    ]

    const profile1 = [
        {
            key: '7',
            label: 'Specialization',
            children: doctors?.doctor_specialization
        },
        {
            key: '8',
            label: 'Experience',
            children: doctors?.doctor_experience
        },
        {
            key: '9',
            label: 'Fees Per Consultation',
            children: doctors?.doctor_fees_per_consultation
        },
        {
            key: '10',
            label: 'Timings',
            children: `${date0} to ${date1}`
        }
    ]

    
    return (
        <LayoutApp>
            <h1>Profile</h1> 
            <Avatar>{a?.charAt(0).toLocaleUpperCase()}</Avatar>

        {
            update ? doctors && (
                
                <Form
                    layout="vertical" className="m-4 w-100"
                    size="large"
                    onFinish={handleUpdateDentist}
                    initialValues={{
                        ...doctors,
                        timings: [
                            dayjs(date0, "HH:mm"),
                            dayjs(date1, "HH:mm")
                        ]
                    }}
                >
                    <h3>Personal Details:</h3>
                    <Row gutter={20} className="w-100">
                        
                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="Fist Name"
                                name="doctor_first_name"
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
                                name="doctor_last_name"
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
                                name="doctor_email"
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
                                name="doctor_phone"
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
                                label="Website"
                                name="doctor_website"
                            >
                                <Input type="text" placeholder="your website"/>
                            </Form.Item>
                        </Col>

                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="Address"
                                name="doctor_address"
                                required
                                rules={[
                                    {
                                        required:true,
                                        message: 'Please Enter your address !'
                                    }
                                ]}
                            >
                                <Input type="text" placeholder="your clinic address"/>
                            </Form.Item>
                        </Col>

                    </Row>

                    <h3>Professional Details:</h3>
                    <Row gutter={20} className="w-100" >

                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="Specialization"
                                name = "doctor_specialization"
                                required
                                rules={[{
                                    required:true,
                                    message: 'Please select your specialization'
                                }]}
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
                                    options={specializations}
                                />
                            </Form.Item>
                        </Col>

                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="Experience"
                                name="doctor_experience"
                                required
                                rules={[
                                    {
                                        required:true,
                                        message: 'Please enter your experience'
                                    }
                                ]}
                            >
                                <Input placeholder="Your experience"/>
                            </Form.Item>
                        </Col>

                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="Fees Per Consultation"
                                name="doctor_fees_per_consultation"
                                required
                                rules={[{required:true}]}
                            >
                                <Input type="text" placeholder="Your fees per consultation"/>
                            </Form.Item>
                        </Col>

                        <Col md={24} lg={8} className="w-100">
                            <Form.Item
                                label="Timings"
                                name='timings'
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select your timeline'
                                    }
                                ]}
                            >
                                <TimePicker.RangePicker format="HH:mm" />
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
                    <Descriptions title="Personal Details:" layout='vertical' items={profile1} bordered className='mt-4'/>
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

export default Profile