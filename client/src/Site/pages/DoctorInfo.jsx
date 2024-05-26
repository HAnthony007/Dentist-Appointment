import { Anchor, Avatar, Descriptions, Layout } from "antd"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LayoutSite from "../LayoutSite";

const { Header, Content, Footer } = Layout;
const { Link } = Anchor

const DoctorInfo = () => {
    const  params = useParams()
    const [doctor, setDoctor] = useState([])
    const [user, setUser] = useState([])



    const getDoctorData = async () => {
        try {
            const res = await axios.post('http://localhost:8082/api/v1/publics/getDoctorById',
                {
                    doctorId: params.doctor_id
                },
            )
            if (res.data.success) {
                setDoctor(res.data.doctor)
                setUser(res.data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDoctorData()
    }, [])

    const date0 = doctor && doctor.timings && JSON.parse(doctor.timings)[0]
    const date1 = doctor && doctor.timings && JSON.parse(doctor.timings)[1]

    const profile = [
        {
            key: '1',
            label: 'First Name',
            children: doctor?.doctor_first_name
        },
        {
            key: '2',
            label: 'Last Name',
            children: doctor?.doctor_last_name
        },
        {
            key: '3',
            label: 'E-mail',
            children: doctor?.doctor_email
        },
        {
            key: '4',
            label: 'No Phone',
            children: doctor?.doctor_phone
        },
        {
            key: '5',
            label: 'Website',
            children: doctor?.doctor_website
        },
        {
            key: '6',
            label: 'Address',
            children: doctor?.doctor_address
        },
        
    ]

    const profile1 = [
        {
            key: '7',
            label: 'Specialization',
            children: doctor?.doctor_specialization
        },
        {
            key: '8',
            label: 'Experience',
            children: doctor?.doctor_experience
        },
        {
            key: '9',
            label: 'Fees Per Consultation',
            children: doctor?.doctor_fees_per_consultation
        },
        {
            key: '10',
            label: 'Timings',
            children: `${date0} to ${date1}`
        }
    ]

    console.log(doctor)
    console.log(user)

    return (
        <LayoutSite>
            <Layout style={{backgroundColor: '#e4edf6'}}>
                <Header className="h-100 p-1" style={{
                    backgroundColor: '#2b4660e6',
                    color: '#fff'
                }}>
                    <div className="d-flex align-items-center container">
                        <Avatar shape="square" size={140}
                            src='../../../public/profile/profile1.png'
                            style={{
                                marginRight: '24px',
                                marginBottom: '16px',
                                marginTop: '16px'
                            }}
                        />
                        <div className="lh-1">
                            <h1 className="fw-bold lh-1 fs-3">Dr {doctor.doctor_first_name} {doctor.doctor_last_name}</h1>
                            <span className="lh-1">{doctor.doctor_specialization}</span>
                        </div>
                    </div>
                </Header>
                <Content className="container">
                    <Descriptions title="Dentist Info" layout='vertical' items={profile} bordered className="mt-5"/>
                    <Descriptions title="Personal Details:" layout='vertical' items={profile1} bordered className='mt-4 mb-5'/>
                </Content>
            </Layout>
        </LayoutSite>
    )
}

export default DoctorInfo