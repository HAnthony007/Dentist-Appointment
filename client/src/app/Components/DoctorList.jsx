import { useNavigate } from "react-router-dom"

const DoctorsList = ({ doctor }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="card m-2"
                style={{cursor:'pointer'}}
                onClick={() => navigate(`/benify/book-appointment/${doctor.doctor_id}`) }

            >
                <div className="card-header">
                    Dr. {doctor.doctor_first_name} {doctor.doctor_last_name}
                </div>
                <div className="card-body">
                    <p>
                        <b>specialization</b> {doctor.doctor_specialization}
                    </p>
                    <p>
                        <b>Experience</b> {doctor.doctor_experience}
                    </p>
                    <p>
                        <b>Fees per Consultation</b> {doctor.doctor_fees_per_consultation}
                    </p>
                    <p>
                        <b>Timings</b> {JSON.parse(doctor.timings)[0]} - {JSON.parse(doctor.timings)[1]}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DoctorsList