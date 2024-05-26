import { Spin } from "antd"

const Spinner = () => {
    return (
        <Spin tip="Loading" 
            size="large" 
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: "rgba(0,0,0,0.1)",
            }}
        >
        </Spin>
    )
}

export default Spinner