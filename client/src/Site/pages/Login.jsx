import { Link, useNavigate } from "react-router-dom"
import LayoutSite from "../LayoutSite"
import { useState } from "react"
import { Form, Button, Checkbox, Input, Select, message } from "antd"
import axios from 'axios'

import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, HomeFilled } from '@ant-design/icons'

const { Option } = Select
const Login = () => {
    const [signUp, setSignUp] = useState(false)
    const [useAlready, setUseAlready] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()


    const handleLogIn = async (values) => {
        try {
            message.loading("Login ...", 2)
            setIsLoading(true)
            const res = await axios.post('http://localhost:8082/api/v1/users/login', values)

            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                setTimeout(() => {
                    message.success("Login successful")
                    navigate("/benify")
                    setIsLoading(false)
                    setTimeout(() => {
                        message.info("WELCOME, Nice to see you again...")
                    }, 3000);
                }, 2000);
            } else {
                setTimeout(() => {
                    message.warning(res.data.message)
                    setIsLoading(false)
                    setUseAlready(true)
                }, 2000);
            }
        } catch (error) {
            console.log(error)
            message.error('Something went wrong')
            setIsLoading(false)
        }
    }

    const handleSingUp = async (values) => {
        try {
            message.loading("Sign Up", 2)
            setIsLoading(true)
            const res = await axios.post('http://localhost:8082/api/v1/users/register', values)

            if (res.data.success) {
                setTimeout(() => {
                    message.success('Registration successfully')
                    setSignUp(false)
                    setIsLoading(false)
                }, 2000);
            } else {
                setTimeout(() => {
                    setUseAlready(true)
                    message.warning(res.data.message)
                    setIsLoading(false)
                }, 2000);
            }
        } catch (error) {
            console.error(error)
            setTimeout(() => {
                message.error('Something went wrong')
                setIsLoading(false)
            }, 1000);
        }
    }

    return (
        <LayoutSite>
            <div className="bgLogin"
                style={{
                    height: "90vh"
                }}
            >
                <div className="d-grid gap-3 pb-0 bgLogin pb-4 mt-2 mb-2 justify-content-center container">
                    <div className=" m-3 p-3 mb-0 pb-0 rounded bg-white inscri isLogin">
                        {/* signUp ? " m-3 p-3  h-75 rounded bg-white inscri widthLogin isSignup" :  */}


                        <Form layout='vertical'
                            className={signUp ? "inscri text-center overflow-hidden hLogSign" : "inscri overflow-hidden text-center hLog"}
                            size='large'
                            onFinish={signUp ? null : handleLogIn}
                        >
                            <div className='fw-bold mb-3 fs-6 text-center inscri'>
                                I already have an account on Helloworld
                            </div>

                            <div className={signUp ? 'formLoginSign overflow-hidden inscri' : "inscri overflow-hidden formLogin"}>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail !'
                                        },
                                        {
                                            required: true,
                                            message: 'Please Input your E-mail !'
                                        }
                                    ]}
                                >
                                    <Input onChange={() => setUseAlready(false)}
                                        status={useAlready ? 'warning' : null}
                                        prefix={<MailOutlined />}
                                        o
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Input your password !'
                                        }
                                    ]}
                                // hasFeedback
                                >
                                    <Input.Password onChange={() => setUseAlready(false)}
                                        status={useAlready ? 'warning' : null}
                                        prefix={<LockOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className='text-start'
                                    name="remember"
                                    valuePropName='checked'
                                    initialValue={true}
                                >
                                    <Checkbox >Remember me</Checkbox>
                                </Form.Item>
                            </div>

                            {
                                signUp ? (
                                    <Form.Item
                                        className={(signUp) ? '' : "d-none"}
                                    >
                                        <Button type='link' className='w-100 fw-bold btn btn-primary'
                                            onClick={() => {
                                                setSignUp(false)
                                                setUseAlready(false)

                                            }}
                                        >
                                            Log In
                                        </Button>
                                    </Form.Item>
                                ) : (
                                    <Form.Item>
                                        <Button type='primary' className='w-100 fw-bold btn' htmlType='submit'
                                            style={{ backgroundColor: "#ffcd4d", color: "#192634" }}
                                            loading={isLoading}
                                            icon={<HomeFilled />}


                                        >
                                            Log In
                                        </Button>
                                    </Form.Item>
                                )
                            }

                        </Form>
                    </div>
                    <div className="m-3 p-3 rounded bg-white inscri">
                        <Form layout='vertical'
                            className={signUp ? "hSign overflow-hidden inscri" : "inscri overflow-hidden hSignLog"}
                            size='large'
                            onFinish={handleSingUp}
                            scrollToFirstError
                        >
                            <div className='fw-bold fs-6 m-2 text-center'>New on HelloWorld ?</div>

                            <Form.Item
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input your First name !'
                                    },
                                    {
                                        pattern: '[a-z]',
                                        message: 'error pattern',


                                    }
                                ]}
                            >
                                <Input placeholder='Enter your First name' prefix={<UserOutlined />} />
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input your Last name !'
                                    },
                                    {
                                        pattern: '[a-zZ-A]',
                                        message: 'error pattern',


                                    }
                                ]}
                            >
                                <Input placeholder='Enter your Last name' prefix={<UserOutlined />} />
                            </Form.Item>
                            <Form.Item
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
                                <Input onChange={() => setUseAlready(false)}
                                    placeholder='Enter your E-mail'
                                    prefix={<MailOutlined />}
                                    status={useAlready ? 'warning' : ''}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input your password !'
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password !'
                                    },
                                    (({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }))
                                ]}

                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>

                            <Form.Item
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
                                <Input placeholder='Enter your Phone number' prefix={<PhoneOutlined />} />
                            </Form.Item>

                            <Form.Item
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Select your gender! '
                                    }
                                ]}
                            >
                                <Select placeholder="Select your gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' className='w-100 fw-bold ' htmlType='submit'
                                    style={{ backgroundColor: "#ffcd4d", color: "#192634" }}
                                    loading={isLoading}
                                >
                                    Sign Up
                                </Button>
                            </Form.Item>

                        </Form>
                        <Link className={signUp ? 'd-none' : 'text-uppercase text-decoration-none fw-bold fs-6 inscri d-flex justify-content-center'} onClick={() => setSignUp(true)}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </LayoutSite>

    )
}

export default Login