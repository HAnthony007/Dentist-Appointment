import { useEffect, useState } from "react"
import LayoutApp from "../LayoutApp";
import { useSelector } from "react-redux"
import axios from 'axios';
// import dayjs from "dayjs";
import moment from 'moment'
import { Table, message } from "antd";

const AppointmentDoctor = () => {
    const { user } = useSelector(state => state.user)

    const [appointments, setAppointments] = useState([])
    const [filteredInfo, setFilteredInfo] = useState({})

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
                setAppointments(res.data.listAppointments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/doctors/updateStatus',
                {
                    appointmentId: record.appointment_id,
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (res.data.success) {
                message.success(res.data.message)
                getAppointments()
            }
        } catch (error) {
            console.error(error)
            message.error("Something went wrong")
        }
    }

    const filterTreatment = appointments.map((e) => ({
        text: e.treatment_name,
        value: e.treatment_name
    }))

    const handleChange = (filters) => {
        setFilteredInfo(filters)
    }

    const columnsAppointmentListDoctor = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {JSON.parse(record.user_info)[0].user_first_name} {JSON.parse(record.user_info)[0].user_last_name}
                </span>
            ),
            fixed: 'left',
            width: 225,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            render: (text, record) => (
                <span>
                    {JSON.parse(record.doctor_info)[0].doctor_phone}
                </span>
            ),

        },
        {
            title: 'Treatment',
            dataIndex: 'treatment_name',
            filters: filterTreatment,
            onFilter: (value, record) => record.treatment_name.indexOf(value) === 0,
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.begin_time).format('DD-MM-YYYY')} &nbsp;
                    {/* { moment(record.time).format('HH:mm') } */}
                    {moment(record.begin_time).format('HH:mm')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'pending',
                    value: 'pending'
                },
                {
                    text: 'approved',
                    value: 'approved'
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    {
                        record.status === "pending" ? (
                            <div className="d-flex">
                                <button className="btn btn-success"
                                    onClick={() => handleStatus(record, 'approved')}
                                >
                                    Approved
                                </button>
                                <button className="btn btn-danger ms-2"
                                    onClick={() => handleStatus(record, 'reject')}
                                >
                                    Reject
                                </button>
                            </div>
                        ) : record.status === "approved" ? (

                            <button className="btn btn-danger ms-2"
                                onClick={() => handleStatus(record, 'reject')}
                            >
                                Reject
                            </button>
                        ) : (
                            <span className="fw-bold text-center w-100">
                                {record.status}
                            </span>
                        )
                    }
                </div>
            ),
            fixed: 'right',
            width: 225,
        }
    ]

    return (
        <LayoutApp>
            <h3>Doctor Appointment</h3>
            <Table columns={columnsAppointmentListDoctor}
                dataSource={appointments}
                onChange={handleChange}
                bordered
                scroll={{
                    x: 1300
                }}
                pagination={{
                    pageSize: 3
                }}
                expandable={{
                    expandedRowRender: (record) => (
                        <p className="m-0">
                            Appointments No:{record.treatment_id}, For {record.treatment_description}
                        </p>
                    ),
                }}
                rowKey={(record) => record.appointment_id}
            />
        </LayoutApp>
    )
}

export default AppointmentDoctor