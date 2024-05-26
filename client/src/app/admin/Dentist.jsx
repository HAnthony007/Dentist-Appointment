import { Button, Form, Table, message } from "antd"
import LayoutApp from "../LayoutApp"
import { useEffect, useState } from "react"
import axios from "axios"

const Dentist = () => {
    const [doctors, setDoctors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllDoctors = async () => {
        try {
            const res = await axios.get('http://localhost:8082/api/v1/admins/getAllDoctors',
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

    useEffect(() => {
        getAllDoctors()
    }, [])

    const handleAccountStatus = async (record, status) => {
    
        try {
            setIsLoading(true)
            const res = await axios.post('http://localhost:8082/api/v1/admins/changeAccountStatus',
                {
                    doctor_id: record.doctor_id,
                    id_user: record.user_id,
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setTimeout(() => {
                    message.success(res.data.message+" " + record.user_id)
                    setIsLoading(false)
                    window.location.reload()
                }, 1000);
            }
        } catch (error) {
            message.error("Something went wrong")
            setIsLoading(false)
        }
    }

    const columnsDoctorList = [
        {
            title: 'Name',
            dataIndex: 'doctor_last_name', 
        },
        {
            title: 'Status',
            dataIndex: 'status', 
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                {
                    record.status === 'pending' ? (
                        <>
                            <Form.Item>
                                <Button className="btn btn-success m"
                                    onClick={() => handleAccountStatus(record, "approved")}
                                    loading={isLoading}
                                >
                                    Approved
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button className="btn btn-danger"
                                    onClick={() => handleAccountStatus(record, "pending")}
                                    loading={isLoading}
                                >
                                    Reject
                                </Button>
                            </Form.Item>
                        </>
                    ) : (
                        <Form.Item>
                            <Button className="btn btn-danger"
                                onClick={() => handleAccountStatus(record, "pending")}
                                loading={isLoading}
                            >
                                Reject
                            </Button>
                        </Form.Item>
                    )
                }
                </div>
            )
        }
    ]

    return (
        <LayoutApp>
            <h3>Doctors List</h3>
            <Table rowKey="doctor_id" columns={columnsDoctorList} dataSource={doctors} key={doctors.user_id}/>
        </LayoutApp>
    )
}

export default Dentist