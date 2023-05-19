export default function PlateSpecs({ image, description, allergenes, price }) {
    return (
        <div className="modal-body">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src={image} alt="Plate Image" className="img-fluid" />
                    </div>
                    <div className="col-md-8">
                        <p>{description}</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h5>Allergeni:</h5>
                        <div>
                            <i className="bi bi-exclamation-circle text-danger" title="Gluten">Gluten </i>
                            <i className="bi bi-exclamation-circle text-danger" title="Dairy">Dairy </i>
                            <i className="bi bi-exclamation-circle text-danger" title="Soy">Soy </i>
                        </div>

                        <h5>Edit Plate:</h5>
                        <div className="input-group mb-5">
                            <input type="text" className="form-control" placeholder="Scrivi qui le modifiche per il tuo piatto" aria-label="Edit Plate" aria-describedby="edit-plate-button" />
                                <button className="btn btn-primary" type="button" id="edit-plate-button">Salva</button>
                        </div>

                        <h4 className="text-end">{price}€</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}