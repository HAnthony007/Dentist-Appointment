import { Navigate } from 'react-router-dom'

export default function  PublicRoutes({ children }) {
    if (localStorage.getItem('token')) {
        return <Navigate to="/hello" />
    } else {
        return children
    }
}