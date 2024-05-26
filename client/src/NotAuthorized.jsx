import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const NotAuthorized = () => {
    return (
        <div className="d-grid "
            style={{
                placeItems: 'center',
                height: '100vh'
            }}
        >
        <Result status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary"><Link to="/login" className="text-decoration-none">Back to <strong>Login</strong></Link></Button>}
        />
        </div>
    )
}

export default NotAuthorized