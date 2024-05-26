import { message } from "antd";
import dayjs from "dayjs";
import { HomeOutlined, UnorderedListOutlined, UserOutlined, MedicineBoxOutlined, LogoutOutlined, MessageOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";

const handleLogout = () => {
    localStorage.clear()
    message.success('Logout Successfully')
    setTimeout(() => {
        window.location.reload()
    }, 1000);
}

export const userMenu = [
    {
        key: '1',
        label: <Link to="/benify" className="text-decoration-none">Home</Link>,
        icon: <HomeOutlined />,
    },
    {
        key: '2',
        label: <Link to="/benify/appointment" className="text-decoration-none">Appointments</Link>,
        icon: <UnorderedListOutlined />,
    },
    {
        key: '3',
        label: <Link to='/benify/apply-doctor' className="text-decoration-none">Apply Doctor</Link>,
        icon: <MedicineBoxOutlined />
    },
    {
        key: '4',
        label: <Link to={'/benify/profileUser'}>Profiles</Link>,
        icon: <UserOutlined />,
    },
    {
        key: '5',
        label: <Link to={`/benify/chat`} className="text-decoration-none">Chat</Link>,
        icon: <MessageOutlined />,
    },
    {
        key: '5',
        label: <Link to="/login" className="text-decoration-none" onClick={handleLogout}>Log Out</Link>,
        icon: <LogoutOutlined />,
    }
]

export const adminMenu = [
    {
        key: '1',
        label: <Link to="/benify" className="text-decoration-none">Home</Link>,
        icon: <HomeOutlined />
    },
    {
        key: '2',
        label: <Link to="/benify/admin/doctors" className="text-decoration-none">Doctors</Link>,
        icon: <MedicineBoxOutlined />
    },
    {
        key: '3',
        label: <Link to="/benify/admin/users" className="text-decoration-none">Users</Link>,
        icon: <UserOutlined />
    },
    {
        key: '4',
        label: <Link to="/login" className="text-decoration-none" onClick={handleLogout}>Log Out</Link>,
        icon: <LogoutOutlined />,
    }
]

export const specializations = [
    {
        value: 1,
        label: 'Initial consultation with the dentist',
    },
    {
        value: 2,
        label: 'Professional teeth cleaning',
    },
    {
        value: 3,
        label: 'Treatment of cries and filing of teeth',
    },
    {
        value: 4,
        label: 'Professional teeth whitening',
    },
    {
        value: 5,
        label: 'Extracting  a tooth',
    },
    {
        value: 6,
        label: 'Orthodontic treatment to align teeth',
    }
]


// ======================= Doctors Page ======================= //


export const columnsUserList = [
    {
        title: 'Name',
        dataIndex: 'user_last_name', 
    },
    {
        title: 'email',
        dataIndex: 'user_email'
    },
    {
        title: 'doctor',
        dataIndex: 'isDoctor',
        render: (text, record) => (
            <span>
            {
                record.isDoctor ? 'Yes' : 'No'
            }
            </span>
        )
    }
]

// =================================================================== //

// ======================================= List Appointments ==========================================================================

export const columnsAppointmentList = [
    {
        title: 'Docteur',
        dataIndex: 'doctor_info',
        render: (text, record) => (
            <span>
                {JSON.parse(record.doctor_info)[0].doctor_first_name} {JSON.parse(record.doctor_info)[0].doctor_last_name}
            </span>
        )
    },
    {
        title: 'Lieu',
        dataIndex: 'doctor_address',
        render: (text, record) => (
            <span>
                {JSON.parse(record.doctor_info)[0].doctor_address}
            </span>
        )
    },
    {
        title: 'phone',
        dataIndex: 'doctor_phone',
        render: (text, record) => (
            <span>
            {
                JSON.parse(record.doctor_info)[0].doctor_phone
            }
            </span>
        )
    },
    {
        title: 'Date & Time',
        dataIndex: 'date',
        render: (text, record) => (
            <span>
                { dayjs(record.begin_time).format('DD-MM-YYYY') } &nbsp;
                { dayjs(record.begin_time).format('HH:mm') }
            </span>
        )
    },
    {
        title: 'Status',
        dataIndex: 'status',
        filters: [
            {
                text: 'reject',
                value: 'reject'
            },
            {
                text: 'approved',
                value: 'approved'
            }
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0
    }
]

// ======================================= Acceuil ======================================================================

