import { Table } from "antd"
import LayoutApp from "../LayoutApp"
import { columnsUserList } from "../data/MenuList"
import { useEffect, useState } from "react"
import axios from 'axios'

const Users = () => {
    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8082/api/v1/admins/getAllUsers',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ) 

            if (res.data.success) {
                setUsers(res.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <LayoutApp>
            <h3>Users List</h3>
            <Table columns={columnsUserList} dataSource={users} />
        </LayoutApp>
    )
}

export default Users