import { Outlet, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DashboardLateralBar from "../components/DashboardLateralBar"
import DashboardNavBar from "../components/DashboardNavbar"


export default function DashboardRoute() {
    // users ENUM: UtenteLoggato, Tavolo, Sala, Cucina, Manager
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null
    const isStaff = userType === "Sala" || userType === "Cucina" || userType === "Manager"

    const [redirect, setRedirect] = useState(isStaff ? false : "/")

    let lists = {
        "Manager": [
            {
                label: "Storico Conti",
                icon: "bi bi-receipt-cutoff fs-4",
                link: "/dashboard/history"
            },
            {
                label: "Gestione Utenti",
                icon: "bi bi-person-gear fs-4",
                link: "/dashboard/staff"
            },
            {
                label: "Modifica Menu",
                icon: "bi bi-book fs-4",
                link: "/dashboard/menu"
            },
            {
                label: "Tavoli",
                icon: "bi bi-square fs-4",
                link: "/dashboard/tables"
            },
            {
                label: "Ordini",
                icon: "bi bi-receipt fs-4",
                link: "/dashboard/orders"
            },
            {
                label: "Prenotazioni",
                icon: "bi bi-journal-bookmark fs-4",
                link: "/dashboard/reservations"
            },
            {
                label: "Problematiche",
                icon: "bi bi-exclamation-triangle fs-4",
                link: "/dashboard/problems"
            },
        ],
        "Sala": [
            {
                label: "Tavoli",
                icon: "bi bi-square fs-4",
                link: "/dashboard/tables"
            },
            {
                label: "Ordini",
                icon: "bi bi-receipt fs-4",
                link: "/dashboard/orders"
            },
            {
                label: "Prenotazioni",
                icon: "bi bi-journal-bookmark fs-4",
                link: "/dashboard/reservations"
            },
            {
                label: "Problematiche",
                icon: "bi bi-exclamation-triangle fs-4",
                link: "/dashboard/problems"
            },
        ],
        "Cucina": [
            {
                label: "Ordini",
                icon: "bi bi-receipt fs-4",
                link: "/dashboard/orders"
            },
            {
                label: "Modifica Menu",
                icon: "bi bi-book fs-4",
                link: "/dashboard/menu"
            },
            {
                label: "Problematiche",
                icon: "bi bi-exclamation-triangle fs-4",
                link: "/dashboard/problems"
            },
        ]
    }


    if (isStaff) {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                    <DashboardNavBar label={"DashBoard"} setRedirect={setRedirect} />
                </header>

                <div className="container-fluid">
                    <div className="row">

                        {/* /Lateralbar */}
                        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar sidebar-sticky collapse">
                            <DashboardLateralBar list={lists[userType]} setRedirect={setRedirect} />
                        </nav>

                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <Outlet />
                        </main>
                    </div>
                </div>
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