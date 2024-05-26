import { Avatar, Typography } from "antd"

const { Text } = Typography
const NavChat = ({ currentChat }) => {
    return (
        <div style={{
            height: '4.5rem',
            backgroundColor: "#fff",
            width: '100%',
            position: 'sticky',
            top: '0'
        }}>
            {
                Object.keys(currentChat).length > 0 ? (
                    <div className="d-flex align-items-center h-100 gap-3 ms-4">
                        <Avatar>{currentChat.userInfo[0].user_last_name.charAt(0).toLocaleUpperCase()}</Avatar>
                        <div className='lh-base'>
                            <div className="fw-bold" >{currentChat.userInfo[0].user_last_name}</div>
                            <Text >online</Text>
                        </div>
                    </div>
                ) : (
                    <h1>Vide</h1>
                )
            }

        </div>
    )
}

export default NavChat