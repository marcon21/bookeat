import { logout } from "../requests"
import { toast } from "react-toastify"

export default function DashboardNavBar({ label, setRedirect }) {

    const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))
    // string of the usertype from the cookie if cookie exists, null otherwise
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null
    // users ENUM: UtenteLoggato, Tavolo, Sala, Cucina, Manager
    const canOrder = userType === "UtenteLoggato" || userType === "Tavolo"
    const isStaff = userType === "Sala" || userType === "Cucina" || userType === "Manager"

    return (
        <>
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" onClick={(e) => {setRedirect("/dashboard")}}>
                {label + " - " + userType}
            </a>
            <button
                className="navbar-toggler position-absolute d-md-none collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <input
                className="form-control form-control-dark w-100"
                type="text"
                placeholder="Search"
                aria-label="Search"
            />
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" role="button" onClick={() => {
                        setRedirect('/')
                    }}>
                        <i className="bi bi-book fs-4"></i>
                    </a>
                </div>
            </div>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" role="button" onClick={() => {
                        setRedirect('/dashboard/settings')
                    }}>
                        <i className='bi bi-gear-fill fs-4'></i>
                    </a>
                </div>
            </div>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" onClick={async () => {
                        await logout()
                        toast.success("Logout effettuato")
                        setRedirect('/login')
                    }}>
                        <i className='bi bi-box-arrow-right fs-4'></i>
                    </a>
                </div>
            </div>
        </>
    )

}