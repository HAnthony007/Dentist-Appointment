import { Card } from "antd"
import LayoutApp from "../LayoutApp"

const Dashboard = () => {
    return (
        <LayoutApp>
            <h1>Dashboard</h1>
            <Card style={{
                width: '20rem',
                height: '20rem',
                placeItems: 'center'
            }}
                className="d-grid"
            >
                <h1>Hello World</h1>
            </Card>
        </LayoutApp>
    )
}

export default Dashboard