import { Button, Result } from "antd"
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-grid "
            style={{
                placeItems: 'center',
                height: '100vh'
            }}
        >
            <Result status="404"
                title="404"
                subTitle="Sorry, this page you visited does not exist."
                extra={<Button type="primary"><Link to="/" className="text-decoration-none">Back to Home</Link></Button>}
            />
        </div>

    )
}

export default NotFound