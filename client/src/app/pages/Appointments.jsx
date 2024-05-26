import { useSelector } from 'react-redux'
import LayoutApp from '../LayoutApp'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'antd'
import { columnsAppointmentList } from '../data/MenuList'

const Appointments = () => {
    const { user } = useSelector(state => state.user)

    const [appointment, setAppointment] = useState([])

    const getAppointments = async () => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/users/userAppointment',
                {
                    userId: user.user_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                setAppointment(res.data.listAppointments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
    }, [])

    console.log(appointment)
    return (
        <LayoutApp>
            <h3>Appointments</h3>
            <Table columns={columnsAppointmentList} 
                dataSource={appointment} 
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

export default Appointments