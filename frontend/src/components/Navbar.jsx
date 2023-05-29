import { logout } from "../requests"

export default function NavBar({ label, onFilterClickHandler, setRedirect }) {
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
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" role="button">
                    <i className="bi bi-cart4 fs-4"></i>
                    </a>
                </div>
            </div>
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
    )

}