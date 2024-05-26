import { useState } from 'react';
import '../css/App.css'
import { Layout, Menu, Button, theme, Badge, message, Avatar } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminMenu, userMenu } from './data/MenuList';

import {
    HomeOutlined,
    UnorderedListOutlined,
    UserOutlined,
    CalendarOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined,
    MedicineBoxTwoTone,
    MessageOutlined,
    LogoutOutlined
} from '@ant-design/icons'


const LayoutApp = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [broke, setBroke] = useState(false);
    const navigate = useNavigate()

    const { user } = useSelector(state => state.user)

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogout = () => {
        localStorage.clear()
        message.success('Logout Successfully')
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }

    const doctorMenu = [
        {
            key: '1',
            label: <Link to={"/benify/doctors/dashboard"} className='text-decoration-none'>Home</Link>,
            icon: <HomeOutlined />,
        },
        {
            key: '2',
            label: <Link to={`/benify/doctors/doctorAppointment`} className="text-decoration-none">Appointments</Link>,
            icon: <UnorderedListOutlined />,
        },
        {
            key: '3',
            label: <Link to={`/benify/doctors/agenda`} className="text-decoration-none">Agenda</Link>,
            icon: <CalendarOutlined />
        },
        {
            key: '4',
            label: <Link to={`/benify/doctors/profiles/${user?.user_id}`} className="text-decoration-none">Profiles</Link>,
            icon: <UserOutlined />,
        },
        {
            key: '5',
            label: <Link to={`/benify/chat`} className="text-decoration-none">Chat</Link>,
            icon: <MessageOutlined />,
        },
        {
            key: '6',
            label: <Link to="/login" className="text-decoration-none" onClick={handleLogout}>Log Out</Link>,
            icon: <LogoutOutlined />,
        }
    ]

    const menuItems = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu

    return (
        <Layout className='layoutApp'
        >
            <Sider trigger={null}
                collapsible collapsed={collapsed}
                collapsedWidth={broke ? "0" : '90'}
                theme='light'
                breakpoint='md'
                onBreakpoint={(broken) => setBroke(broken)}
            >
                <div className='p-3 d-flex justify-content-center align-items-center'  >
                    <MedicineBoxTwoTone
                        style={{
                            color: '#107aca',
                            fontSize: '2rem'
                        }}
                    />
                    <h5 className={collapsed ? 'd-none' : 'mb-0'}>Be Nify</h5>
                </div>
                <hr className='mt-0' />
                <Menu
                    className='h-100'

                    theme="light"
                    mode="inline"
                    items={menuItems}
                />
            </Sider>
            <Layout
            >
                <Header className='d-flex justify-content-between '
                    style={{
                        paddingLeft: 0,
                        background: '#1E89E7',
                        color: 'white'
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className=' d-flex align-items-center gap-4 text-uppercase text-white'>
                        <Badge count={user && user.user_notification ? JSON.parse(user.user_notification).length : 0}
                            onClick={() => navigate('/benify/notification')}
                        >
                            <BellOutlined style={{
                                color: 'white',
                                fontSize: '1.5rem'
                            }} />
                        </Badge>
                        <Link to={user?.isDoctor ? `/benify/doctors/profiles/${user?.user_id}` : '/benify/profileUser'}
                            className='text-decoration-none fw-bold lh-1 text-white'
                        >
                            <Avatar>{user?.user_first_name.charAt(0)}</Avatar> &nbsp;
                            {
                                user?.user_first_name
                            }
                        </Link>
                    </div>
                </Header>

                {
                    location.pathname != "/benify/chat" ? (
                        <Content
                            style={{
                                // margin: '24px 16px 0',
                                overflow: 'initial',
                                display: 'flex',
                                width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    margin: '1rem 3rem 1rem 3rem',
                                    padding: 24,
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                    overflowY: 'scroll',
                                    overflowX: 'hidden',
                                    height: '100%'
                                }}
                            >
                                {children}
                            </div>
                        </Content>
                    ) : (
                        <Content
                            style={{
                                overflow: 'initial',
                                display: 'flex',
                                width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#eef1f7',
                                    display: 'flex'
                                }}
                            >
                                {children}
                            </div>
                        </Content>
                    )
                }

                <Footer>
                    HelloWorld ©{new Date().getFullYear()} Created by Anthony007
                </Footer>
            </Layout>
        </Layout>
    );
};
export default LayoutApp;