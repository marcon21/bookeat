import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function ReservationsRoute() {
    // users ENUM: UtenteLoggato, Tavolo, Sala, Cucina, Manager
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null

    const [redirect, setRedirect] = useState((userType === "Manager" || userType === "Sala") ? false : "/")

    if (userType === "Manager" || userType === "Sala") {
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