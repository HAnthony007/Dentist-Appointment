import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment)
import LayoutApp from '../LayoutApp'
import { useState } from 'react'
import { Button, Col, DatePicker, Form, Modal, Select, message } from 'antd'
// import ModalAgenda from './ModalAgenda'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import '../../css/Agenda.css'
import { specializations } from "../data/MenuList"
import { hideLoading, showLoading } from '../../redux/features/alertSlice'


// const events = [
//     {
//         start: moment('2024-03-24T10:15:00').toDate(),
//         end: moment('2024-03-24T10:15:00').toDate(),
//         title: "Chirurgie Dentale",
//     },
//     {
//         start: moment('2024-03-24T10:15:00').toDate(),
//         end: moment('2024-03-27T10:15:00').toDate(),
//         title: "Chirurgie ",
//     },
//     {
//         start: moment('2024-03-26T10:15:00').toDate(),
//         end: moment('2024-03-26T10:15:00').toDate(),
//         title: " Dentale",
//     }
// ]


const AgendaDoctor = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()


    const [showModal, setShowModal] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [selectEvent, setSelectEvent] = useState(null);
    const [doctorInfo, setDoctorInfo] = useState([])
    const [isAvailable, setIsAvailable] = useState(false)
    const [dateSelect, setDateSelect] = useState(null)

    const getAppointments = async () => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/doctors/doctorAppointment',
                { userId: user.user_id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const Events = appointments?.map((e) => ({
        title: e.treatment_name,
        start: new Date(e.begin_time),
        end: new Date(e.end_time)
    }))
    // setAllEvent(Events)

    // const handleAvaibility = (values) => {
    //     console.log(values)
    //     setShowModal(false)
    // }

    const handleSelectSlot = (slotInfo) => {
        setShowModal(true)
        setSelectEvent(null)
        setDateSelect(moment(slotInfo.start))
        console.log((dateSelect))
    }

    const handleOk = () => {
        setShowModal(false)
        setDateSelect('')
        message.success("Ok")
    }

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/doctors/getDoctorInfo',
                {
                    user_id: user.user_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setDoctorInfo(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDoctorInfo()
    }, [])

    const handleAvaibility = async (values) => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/users/bookingAvaibility',
                {
                    doctorId: doctorInfo.doctor_id,
                    timings0: JSON.parse(doctorInfo.timings)[0],
                    timings1: JSON.parse(doctorInfo.timings)[1],
                    treatmentId: values.treatmentId,
                    dateString: values.dates.$d,
                    doctorEndTime: JSON.parse(doctorInfo.timings)[1]
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
                    doctorId: doctorInfo.doctor_id,
                    userId: user.user_id,
                    doctorInfo: [doctorInfo],
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

    return (
        <LayoutApp>
            <DatePicker showTime className="w-100"
                                format="YYYY-MM-DD HH:mm"
                                placeholder='YYYY-MM-DD HH:mm'
                                onChange={() => setIsAvailable(false)}
                                value={moment(dateSelect)}
                            />
            <h3>Agenda</h3>
            <Calendar localizer={localizer} events={Events}
                startAccessor="start"
                endAccessor="end"

                selectable={true}
                onSelectSlot={handleSelectSlot}
            />
            <Modal
                title="Hello modal"
                open={showModal}
                onCancel={handleOk}
            >
                {/* <Form
                    onFinish={handleAvaibility}
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
                                placeholder="Search to Select"
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
                </Form> */}

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
                                value={(dateSelect?.start)}
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
            </Modal>
        </LayoutApp>

    )
}

export default AgendaDoctor