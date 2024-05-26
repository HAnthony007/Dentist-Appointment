import { Col, Form, Input, Row, Select, TimePicker, message } from "antd"
import dayjs from "dayjs"
import axios from 'axios'
import LayoutApp from "../LayoutApp"
import { specializations } from "../data/MenuList"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../../redux/features/alertSlice"

const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleApplyDentist = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8082/api/v1/users/apply-doctor',
                {
                    ...values,
                    timings: [
                        dayjs(values.timings[0].$d).format("HH:mm"),
                        dayjs(values.timings[1].$d).format("HH:mm"),
                    ],

                    user_id: user.user_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/benify')
            } else {
                message.error(res.data.message+"hello World!")
            }

        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong')
        }
    }  

    return (
        <LayoutApp>
            <h1>Apply Doctor</h1>

            <Form layout="vertical" className="m-4 w-100"
                size="large"
                onFinish={handleApplyDentist}
            >
                <h3>Personal Details:</h3>
                <Row gutter={20} className="w-100">
                    
                    <Col md={24} lg={8} className="w-100">
                        <Form.Item
                            label="Fist Name"
                            name="first_name"
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
                            name="last_name"
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
                            name="email"
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
                            name="phone"
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
                            name="website"
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
                            name = "specialization"
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
                                Submit
                            </button>
                        </div>
                        
                    </Col>

                </Row>
            </Form>
        </LayoutApp>
    )
}

export default ApplyDoctor