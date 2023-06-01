import { logout } from "../requests"

export default function NavBar({ label, onFilterClickHandler, setRedirect, checkout }) {

    function launchModal(modalId) {
        document.getElementById(modalId.concat("Button")).click()
    }

    const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))
    // string of the usertype from the cookie if cookie exists, null otherwise
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null
    // users ENUM: UtenteLoggato, Tavolo, Sala, Cucina, Manager
    const canOrder = userType === "Utente" || userType === "Tavolo"
    const isStaff = userType === "Sala" || userType === "Cucina" || userType === "Manager"

    return (
        <>
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" onClick={(e) => onFilterClickHandler(0, 0)}>
                {label}
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
            {(isLoggedIn && canOrder) && (
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" role="button" onClick={() => {
                            launchModal("checkoutModal")
                        }}>
                            <i className="bi bi-cart4 fs-4"></i>
                        </a>
                    </div>
                </div>
            )}
            {(isLoggedIn && isStaff) && (
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" role="button" onClick={() => {
                            setRedirect('/dashboard')
                        }}>
                            <i className="bi bi-clipboard-fill fs-4"></i>
                        </a>
                    </div>
                </div>
            )}
            {isLoggedIn && (
                <>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <a className="nav-link px-3" role="button">
                                <i className='bi bi-gear-fill fs-4'></i>
                            </a>
                        </div>
                    </div>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <a className="nav-link px-3" onClick={async () => {
                                await logout()
                                setRedirect('/login')
                            }}>
                                <i className='bi bi-box-arrow-right fs-4'></i>
                            </a>
                        </div>
                    </div>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <a className="nav-link px-3" role="button" onClick={() => {
                                setRedirect('/login')
                            }}>
                                <i className='bi bi-box-arrow-in-right fs-4'></i>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    )

}