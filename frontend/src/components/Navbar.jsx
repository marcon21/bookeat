export default function NavBar({ label, onFilterClickHandler }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
                <div onClick={(e) => onFilterClickHandler(0, 0)}>
                    <a className="navbar-brand ms-3 text-light">{label}</a>
                </div>
                <div className="ms-auto">
                    <a className="btn btn-outline-light me-3" href="#" role="button">
                        <i className="bi bi-cart4 fs-4"></i>
                    </a>
                </div>
            </nav>
        </>
    )

}