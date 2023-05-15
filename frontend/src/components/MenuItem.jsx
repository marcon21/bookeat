export default function MenuItem({ name, price, description}) {
    return (
        <div className="card" style={{width: 15 + 'em'}}>
            <img src="/plate.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{price}$</h6>
                    <p className="card-text">{description}</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
        </div>
    )
}