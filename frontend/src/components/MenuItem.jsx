export default function MenuItem() {
    return (
        <div className="card" style={{width: 15 + 'em'}}>
            <img src="/plate.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Spaghetti Meatballs</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">18$</h6>
                    <p className="card-text">Spaghetti pasta with meat meatballs.</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
        </div>
    )
}