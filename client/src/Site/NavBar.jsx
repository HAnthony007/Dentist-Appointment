import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

const NavBar = () => {
    return (
        <Navbar className='container sticky h-100 d-flex align-items-center justify-content-between'>
            <Navbar.Brand className='text-white fs-2'>
                <Link className='text-white text-decoration-none' to="/">Be-Nify</Link>
            </Navbar.Brand>
            <Nav className='justify-content-end gap-4 h-100 align-items-center'>
                <Nav.Link className='btn btn-success text-bg-light text-black fw-bold'>
                    Vous etes Praticien?
                </Nav.Link>
                <Link to="/login" className='text-decoration-none h-100  d-flex align-items-center gap-3 text-white'>
                    <UserOutlined className='fs-5'/>
                    <div className='lh-base'>
                        <div className='fw-bold'>Log In</div>
                        <div className='opacity-75'>Manage your Appointment</div>
                    </div>
                </Link>
            </Nav>
        </Navbar>
    )
}

export default NavBar