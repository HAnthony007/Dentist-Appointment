import { Row } from "antd"
import LayoutApp from "../LayoutApp";
import DoctorsList from "../Components/DoctorList"
import { useEffect, useState } from "react"
import axios from 'axios';

const Acceuils = () => {
    const [doctors, setDoctors] = useState([])

    const getAllDoctorAppointments = async () => {
        try {
            const res = await axios.get('http://localhost:8082/api/v1/users/getAllDoctor',
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
        getAllDoctorAppointments()
    }, [])
    
    return (
        <LayoutApp>
            <h1 className="text-center">Doctor List</h1>
            <Row>
            {
                doctors && doctors.map((doctor, i) => (
                    <DoctorsList doctor={doctor} key={i}/>
                )) 
            }
            </Row>
        </LayoutApp>
    )
}

export default Acceuils
