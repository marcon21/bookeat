export default function NavBar() {
    let list = [
        {
            label: "Label",
        }
    ]

    const items = list.map((item, index) => {
        return(<a className="navbar-brand">{item.label}</a>)
        })
    
        return(
            <>
                <div class="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                        {items}
                        <form className='d-flex input-group w-auto'>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">🔍</button>
                        </form>
                        <form>
                            <a className="btn btn-outline-success my-2 my-sm-0" href="#" role="button">Carrello</a>
                        </form>
                    </nav>
                </div>
            </>
        )
    
}