import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { setUser } from '../redux/features/userSlice';
import { useEffect } from 'react';

export default function ProtectedRoutes({ children }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    // eslint-disable-next-line
    const getUser = async () => {
        try {
            dispatch(showLoading())
                const res = await axios.post('http://localhost:8082/api/v1/users/authentication',
                    { token: localStorage.getItem('token') },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
            dispatch(hideLoading())

            if(res.data.success){
                dispatch(setUser(res.data.data))
            } else {
                <Navigate to="/login"/>
                localStorage.clear()
            }
        } catch (error) {
            dispatch(hideLoading())
            localStorage.clear()
            console.error(error)
        }
    }

    useEffect(() => {
        if(!user) {
            getUser()
        }
    }, [user, getUser])
    
    if(localStorage.getItem("token")){
        return children
    } else {
        return <Navigate to="/403"/>
    }
}
