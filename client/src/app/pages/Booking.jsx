import { useParams } from "react-router-dom"
import LayoutApp from "../LayoutApp";
import { useEffect, useState } from "react"
import axios from 'axios';
import { Col, DatePicker, Form, Select, Table, message } from "antd";
// import dayjs from "dayjs";
// import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { specializations } from "../data/MenuList";


// const { RangePicker } = DatePicker

const Booking = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.user)

    const [doctor, setDoctor] = useState([])

    const [isAvailable, setIsAvailable] = useState(false)
    
    const [treatment, setTreatment] = useState([])

    const getDoctorData = async () => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/doctors/getDoctorById',
                {
                    doctorId: params.doctorId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setDoctor(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    console.log(doctor.doctor_first_name)

    const handleAvaibility = async (values) => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/users/bookingAvaibility',
                {
                    doctorId: params.doctor_id,
                    timings0: JSON.parse(doctor.timings)[0],
                    timings1: JSON.parse(doctor.timings)[1],
                    treatmentId: values.treatmentId,
                    dateString: values.dates.$d,
                    doctorEndTime: doctor && doctor.timings && JSON.parse(doctor.timings)[1]
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (res.data.success) {
                setIsAvailable(true)
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
        console.log(`Avaibility: ${values.treatmentId} ${values.dates.$d}`)
    }
    const handleBooking = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8082/api/v1/users/bookAppointment',
                {
                    doctorId: (params.doctorId),
                    userId: user.user_id,
                    doctorInfo: [doctor],
                    userInfo: [user],
                    treatmentId: values.treatmentId,
                    dateString: values.dates.$d,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                message.success(res.data.message)
                setTimeout(() => {
                    // window.location.reload()
                    dispatch(hideLoading())
                }, 1000);
                console.log(res.data.data)
            } else {
                dispatch(hideLoading())
                message.error(`Error ${res.data.message}`)
            }
        } catch (error) {
            console.log(error)
            dispatch(hideLoading())
        }
        // console.log(`Booking available: ${values.treatmentId} ${values.dates.$d}`)
    }

    const listTraitment = async () => {
        try {
            const res = await axios.get('http://localhost:8082/api/v1/users/getAllTreatment',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setTreatment(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDoctorData()
        listTraitment()
    }, [])

    const treatmentList = [
        {
            key: '1',
            title: 'Description',
            dataIndex: 'treatment_description',
        },
        {
            key: '2',
            title: 'Timing',
            dataIndex: 'treatment_timings'
        }
    ]

    return (
        <LayoutApp>
            <h3>Booking Page</h3>
            <div className="d-flex">
                <div className="container">
                    {
                        doctor && (
                            <>
                                <h4>Dr.{doctor.doctor_first_name} {doctor.doctor_last_name}</h4>
                                <h4>Fees: {doctor.doctor_fees_per_consultation}</h4>
                                <h4>Timings: {doctor.timings && JSON.parse(doctor.timings)[0]} - {doctor.timings && JSON.parse(doctor.timings)[1]}</h4>

                                <Form layout="vertical"
                                    className="w-100"
                                    size="large"
                                    onFinish={isAvailable ? handleBooking : handleAvaibility}
                                >
                                    <Col md={24} lg={14} className="w-100">
                                        <Form.Item
                                            name="treatmentId"
                                            required
                                            rules={[{
                                                required: true,
                                                message: 'Please select your Treatment'
                                            }]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Select description"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={specializations}
                                                onChange={() => setIsAvailable(false)}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col md={24} lg={14} >
                                        <Form.Item name="dates"
                                            rules={[{
                                                required: true,
                                                message: 'Please input your date appointment!'
                                            }]}
                                        >
                                            <DatePicker showTime className="w-100"
                                                format="YYYY-MM-DD HH:mm"
                                                placeholder='YYYY-MM-DD HH:mm'
                                                onChange={() => setIsAvailable(false)}
                                            />
                                        </Form.Item>
                                    </Col>
                                    {
                                        isAvailable ? (

                                            <button className="btn btn-dark mt-2"
                                                onClick={handleBooking}
                                            >
                                                Book Now
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary mt-2"
                                                onClick={handleAvaibility}
                                            >
                                                Check avaibility
                                            </button>
                                        )
                                    }
                                </Form>

                            </>
                        )
                    }
                </div>
                <div className=" w-50">
                    <h1 className="text-center">List of treatment</h1>
                    <Table dataSource={treatment}
                        columns={treatmentList}
                        rowKey={(record) => record.treatment_id}
                    />
                </div>
            </div>

        </LayoutApp>
    )
}

export default Booking