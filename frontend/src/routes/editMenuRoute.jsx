import { useState } from 'react'
import { getMenu, insertPlate, editPlate, deletePlate } from '../requests'
import { Navigate, useLoaderData } from 'react-router-dom'
import MenuEditTable from '../components/MenuEditTable'

export async function loader() {
    const menu = await getMenu()
    return menu
}

export default function EditMenuRoute() {
    // users ENUM: UtenteLoggato, Tavolo, Sala, Cucina, Manager
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null

    const [redirect, setRedirect] = useState((userType === "Manager" || userType === "Cucina") ? false : "/")
    

    if (userType === "Manager" || userType === "Cucina") {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
                <MenuEditTable />
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