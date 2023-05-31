export default function CheckOut({ checkoutList, removeFromCheckout, increasePriority, decreasePriority }) {
    if (checkoutList.length === 0) {
        return (
            <div className="alert alert-primary" role="alert">
                Il carrello è vuoto
            </div>
        )
    } else {
        let maxPriorita = 0
        checkoutList.forEach((item) => {
            if (item["priorita"] > maxPriorita) {
                maxPriorita = item["priorita"]
            }
        })

        let items = []
        for (let i = 0; i <= maxPriorita; i++) {
            items.push(
                <>
                    <h5>Marcia {i}</h5>
                    <div className="list-group list-group-flush">
                        {checkoutList.map((item, index) => {
                            if (item["priorita"] === i) {
                                return (
                                    <div key={i + "-" + index} className="list-group-item">
                                        <div className="row">
                                            <div className="col-2">
                                                <div className="btn-group-vertical" role="group">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => { removeFromCheckout(index) }}><i className='bi bi-x'></i></button>
                                                    <button type="button" className="btn btn-outline-dark" onClick={()=>{decreasePriority(index)}} ><i className='bi bi-arrow-up'></i></button>
                                                    <button type="button" className="btn btn-outline-dark" onClick={()=>{increasePriority(index)}} ><i className='bi bi-arrow-down'></i></button>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <h5 className="card-title">{item['nome']}</h5>
                                                <h6 className="card-subtitle mb-2 text-body-secondary">{(item["prezzo"] / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</h6>
                                                <p className="card-text">{item['note']}</p>
                                            </div>
                                            <div className="col-4">
                                                {item['ingredientiScelti'].map((ingrediente, index) => {
                                                    return (
                                                        <>
                                                            <span key={ingrediente + "-" + index}>{ingrediente} </span>
                                                            <br />
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <br />
                </>
            )
        }

        return (
            <>
                {items}
            </>
        )
    }
}