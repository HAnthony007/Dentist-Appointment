import { Avatar, Button, Form, Select, Space } from "antd"
import { Typewriter } from 'react-simple-typewriter'

import { SearchOutlined } from '@ant-design/icons'
import LayoutSite from "../LayoutSite"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const { Option } = Select
const HomePage = () => {
    const [doctors, setDoctors] = useState([])
    const navigate = useNavigate()

    const getAllDoctorAppointments = async () => {
        try {
            const res = await axios.get('http://localhost:8082/api/v1/publics/getAllDoctorPublics',
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
    
    const handleSelect = (e) => {
        setTimeout(() => {
            navigate(`/dentist/user/${e}`)
        }, 1000);

    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    const listDoctors = doctors.map((e) => ({
            value: e.doctor_id,
            label: <div className='d-flex align-items-center gap-2'
            onClick={() => {
                setTimeout(() => {
                    navigate(`/dentist/user/${e.doctor_id}`)
                }, 1000);
            }}>
            <Avatar>USER</Avatar>
            <div>
                <span>{e.doctor_first_name} {e.doctor_last_name}</span>
                <div>{e.doctor_phone}</div>
            </div>

        </div>,
            labelInValue: <div>{e.doctor_phone}</div>
            
        }))
    return (
        <LayoutSite>
            <section className="rounded-bottom-5 bg-main site-main">
                <div className="container d-flex h-100">
                    <div className='lh-1'
                        style={{
                            marginTop: '120px',
                        }}
                    >
                        <h2 className="fs-1 mb-5 fw-bold text-white lh-lg justify-content-center align-items-center">
                            Find an appointment with
                            <div className='fs-2 d-block lh-1'  style={{ color: "#ccf2ff" }}>
                                <Typewriter
                                    words={[' General Dentistry', " Orthodontics", " Endodontics", " Periodontics", " Prosthodontics", " Oral and Maxillofacial Surgery", " Pediatric Dentistry"]}
                                    loop
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={200}
                                    deleteSpeed={100}
                                    delaySpeed={1000}
                                />
                            </div>
                        </h2>
                        

                        <Form layout='horizontal'
                            onFinish={handleSubmit}
                        >
                            <Form.Item >
                                <Space.Compact className='p-2 align-items-center bg-white rounded-5'  size='large' >
                                    <Form.Item className='m-0' style={{zIndex: 1}}
                                        name="doc"
                                    >
                                        {/* <Input placeholder='Name, Specialties, establishment,...' className='border-0' prefix={<CiSearch />}/> */}
                                        <Select placeholder='Name, Specialties, establishment,...' prefix={<SearchOutlined />}
                                            style={{width: 300, zIndex: '1'}}
                                            showSearch status='0' variant='borderless'
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option.children.join(' ') ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            onChange={(value) => {
                                                console.log(`Selected doctor: ${value}`)
                                            }}
                                            onSelect={(value) => navigate(`/dentist/user/${value}`)}
                                            
                                        >
                                            {doctors.map((doctor) => (
                                                <Option key={doctor.doctor_id} value={doctor.doctor_id} style={{zIndex: 1}}>
                                                    {doctor.doctor_first_name} <br />
                                                    {doctor.doctor_last_name} <br />
                                                    {doctor.doctor_specialization}
                                                </Option>
                                            ))}
                                        </Select>

                                        {/* <Select
                                                showSearch
                                                placeholder="Select description"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={specializations}
                                                onChange={() => setIsAvailable(false)}
                                            /> */}
                                    </Form.Item>

                                    <Form.Item className='m-0'>
                                        <Button type='primary' className='rounded-end-5' 
                                            htmlType='submit'
                                            style={{width: 100}}
                                        >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Space.Compact>
                            </Form.Item>
                        </Form>

                    </div>
                    
                </div>
            </section>
                    
            <section className='container' style={{zIndex: 2}}>
                <ul className=' d-grid gap-4 justify-content-center list-unstyled top'>
                    <li className=' d-flex w-100 bg-white rounded overflow-hidden cardStyle m-auto'>
                        <div className="d-flex flex-column h-100 flex-wrap align-items-start p-3">
                            <span className='fw-bold overflow-hidden lh-base'>Vie de couple, famille, enfants: trouvez le psy adapte a vos besoins</span>
                            <a >Ca m&apos;interesse</a>
                        </div>
                        <div className="h-100 imgListe">
                            <picture>
                                <img src="/listmain1.webp" alt="m'interreser" />
                            </picture>
                        </div>
                    </li>
                    <li className='d-flex  bg-white rounded overflow-hidden cardStyle m-auto'>
                        <div className='d-flex flex-column flex-wrap align-items-start p-3 h-100'>
                            <span className='fw-bold overflow-hidden lh-base'>Messagerie : contacter vos praticiens n&apos;a jamais été aussi simple</span>
                            <a >Decouvrir</a>
                        </div>
                        <div className="h-100 imgListe">
                            <picture>
                                <img src="/listmain2.webp" alt="Decouvrir" />
                            </picture>
                        </div>
                    </li>
                    <li className='last d-flex  bg-white rounded overflow-hidden cardStyle m-auto'>
                        <div className='d-flex flex-column flex-wrap align-items-start p-3 h-100'>
                            <span className='fw-bold overflow-hidden lh-base'>Le rôle du pharmacien évolue : découvrez ses missions</span>
                            <a >En savoir plus</a>
                        </div>
                        <div className="h-100 imgListe">
                            <picture>
                                <img className='' src="/listemain3.webp" alt="savoir_Plus" />
                            </picture>
                        </div>
                    </li>
                </ul>
            </section>
            

            <div className="bg-white pb-5">
                <section className="container pt-5 pb-5">
                    <h2 className='fw-bold lh-lg text-center'>Be Nify: au service de votre sante</h2>
                    <div className="d-grid service gap-4 ">
                        <div className="d-flex flex-column align-items-center text-center mt-5 m-auto">
                            <img src="/calendar.svg" alt="calendar"/>
                            <span><strong>Accedez simplement</strong> et rapidement à une large communauté de praticiens</span>
                        </div>
                        <div className="d-flex flex-column align-items-center text-center mt-5">
                            <img src="/sante.svg" alt="Santer" />
                            <span><strong>Gerez votre sante</strong> et celle de vos proches de façon sécurisée : compte, documents, rendez-vous</span>
                        </div>
                        <div className="d-flex flex-column align-items-center text-center mt-5 last m-auto">
                            <img src="/alert.svg" alt="alert" />
                            <span><strong>Prevenez l&apos;apparition de maladies</strong> grâce à des messages de sensibilisation.</span>
                        </div>
                    </div>
                </section>

                <section className='container'>
                    <div className="d-grid cest gap-5 p-5 text-center align-items-center">
                        <h3 className='fw-bold'>Be Nify is...</h3>
                        <div>
                            <h3 className='fs-2 fw-semibold  colornumber'>80 millions</h3>
                            <div>de patients </div>
                        </div>
                        <div>
                            <h3 className='fs-2 fw-semibold colornumber'>900 000</h3>
                            <div>utilisateur professionnels </div>
                        </div>
                        <div>
                            <h3 className='fs-2 fw-semibold colornumber'>97 %</h3>
                            <div>d&apos;avis positifs </div>
                        </div>
                    </div>
                </section>

                <section className='container mt-5'>
                    <div className="d-grid recrute cest gap-5 p-5 text-center align-items-center">
                        <picture>
                            <img src="/recrute1.webp" alt="recrute1" />
                        </picture>
                        <div className="d-grid">
                                <h2>Be Nify Recrute !</h2>
                                <p>Jouez un rôle actif, au quotidien, dans le secteur de la santé.</p>
                                <button className="btn">
                                    Nous rejoindre
                                </button>
                        </div>
                        <picture>
                            <img src="/recrute2.webp" alt="recrute2" />
                        </picture>
                    </div>
                </section>
            </div>
        </LayoutSite>
    )
}

export default HomePage