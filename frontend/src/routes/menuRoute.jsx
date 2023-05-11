export default function MenuRoute() {
    return (
        <div className="row">
            <div className="col-3 bg-dark h-100">
                {/* Lateral Bar */}
                <div className="container-fluid">
                    <button type="button" className="btn btn-primary">Primary</button>
                    <p>ciao</p>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    {/* Navbar */}
                    <div className="container-fluid dark">
                        <p>ciao</p>
                    </div>
                </div>
                <div className="row">
                    {/* Menu Body */}
                    <div className="container-fluid dark">
                        <p>ciao</p>
                    </div>
                </div>
            </div>
        </div>
    )
}