import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import Spinner from "./Spinner"
import HomePage from "./Site/pages/HomePage"
import Login from "./Site/pages/Login"
import DoctorInfo from "./Site/pages/DoctorInfo"
import ProtectedRoutes from "./Components/ProtectedRoutes"
import ApplyDoctor from "./app/pages/ApplyDoctor"
import Appointments from "./app/pages/Appointments"
import Notification from "./app/pages/Notification"
import Booking from "./app/pages/Booking"
import ProfileUsers from "./app/pages/ProfileUsers"
import Users from "./app/admin/Users"
import Dentist from "./app/admin/Dentist"
import Profile from "./app/doctor/Profile"
import AppointmentDoctor from "./app/doctor/AppointmentDoctor"
import AgendaDoctor from "./app/doctor/AgendaDoctor"
import Dashboard from "./app/doctor/Dashboard"
import Acceuils from "./app/pages/Acceuils"
import Chat from "./app/chat/Chat"
import NotFound from "./NotFound"
import NotAuthorized from "./NotAuthorized"

const App = () => {
    const { loading = false } = useSelector(state => state.alerts)

    return (
        <BrowserRouter>
            {
                loading ? (

                    <Spinner />

                ) : (
                    <Routes>

                        {/* ============================== HTTPS STATUS ==================================== */}

                        {/* 404 */}
                        <Route path="*"
                            element={
                                <NotFound />
                            }
                        ></Route>

                        <Route path="/403"
                            element={
                                <NotAuthorized />
                            }
                        ></Route>

                        {/* =============================================================================== */}


                        {/* ============================== Public Routes ==================================== */}

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


                        {/* =============================================================================== */}

                        {/* ================================= Private Routes ============================== */}

                        <Route path="/benify"
                            element={
                                <ProtectedRoutes>
                                    <Acceuils />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/apply-doctor"
                            element={
                                <ProtectedRoutes>
                                    <ApplyDoctor />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/appointment"
                            element={
                                <ProtectedRoutes>
                                    <Appointments />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/notification"
                            element={
                                <ProtectedRoutes>
                                    <Notification />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/book-appointment/:doctorId"
                            element={
                                <ProtectedRoutes>
                                    <Booking />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/chat"
                            element={
                                <ProtectedRoutes>
                                    <Chat />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/profileUser"
                            element={
                                <ProtectedRoutes>
                                    <ProfileUsers />
                                </ProtectedRoutes>
                            }
                        ></Route>


                        {/* ================================= Admin Routes ============================== */}

                        <Route path="/benify/admin/users"
                            element={
                                <ProtectedRoutes>
                                    <Users />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/admin/doctors"
                            element={
                                <ProtectedRoutes>
                                    <Dentist />
                                </ProtectedRoutes>
                            }
                        ></Route>


                        {/* ================================= Doctors Routes ============================== */}

                        <Route path="/benify/doctors/dashboard"
                            element={
                                <ProtectedRoutes>
                                    <Dashboard />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/doctors/profiles/:id"
                            element={
                                <ProtectedRoutes>
                                    <Profile />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/doctors/doctorAppointment"
                            element={
                                <ProtectedRoutes>
                                    <AppointmentDoctor />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        <Route path="/benify/doctors/agenda"
                            element={
                                <ProtectedRoutes>
                                    <AgendaDoctor />
                                </ProtectedRoutes>
                            }
                        ></Route>

                        {/* =============================================================================== */}
                    </Routes>
                )
            }
        </BrowserRouter>
    )
}

export default App