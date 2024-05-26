import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import HomePage from "./Site/pages/HomePage"
import Login from "./Site/pages/Login"
import DoctorInfo from "./Site/pages/DoctorInfo"
import NotFound from "./NotFound"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/"
                    element={
                        <HomePage />
                    }
                ></Route>

                <Route path="/login"
                    element={
                        <Login />
                    }
                ></Route>

                <Route path="/dentist/user/:doctor_id"
                    element={
                        <DoctorInfo />
                    }
                ></Route>

                <Route path="/404"
                    element={
                        <NotFound />
                    }
                ></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App