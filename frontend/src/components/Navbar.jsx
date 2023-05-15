export default function NavBar({ label }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <a className="navbar-brand ms-3">{label}</a>
                <form className='d-flex input-group w-auto'>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="button">🔍</button>
                </form>
                <form>
                    <a className="btn btn-outline-success my-2 my-sm-0 me-3" href="#" role="button">Carrello</a>
                </form>
            </nav>
        </>
    )

}