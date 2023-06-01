import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function StaffRoute() {
    // users ENUM: UtenteLoggato, Tavolo, Sala, Cucina, Manager
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null

    const [redirect, setRedirect] = useState(userType === "Manager" ? false : "/")

    if (userType === "Manager") {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
            </>
        )
    } else {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
            </>
        )
    }
}