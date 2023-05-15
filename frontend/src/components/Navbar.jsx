export default function NavBar() {
    return(
        <>
            <div class="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                    <a className="navbar-brand">Navbar</a>
                    <form className='d-flex input-group w-auto'>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <form>
                        <a className="btn btn-outline-success my-2 my-sm-0" href="#" role="button">Carrello</a>
                    </form>
                </nav>
            </div>
        </>
    )

}