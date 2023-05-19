export default function PlateSpecs({ image, description, allergenes, price }) {
    return (
        <div className="modal-body">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <img src={image} alt="Plate Image" className="img-fluid" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h5>Description:</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum, purus vitae mattis sodales, nisl ipsum consequat ex, ac facilisis elit tortor at nunc.</p>

                        <h5>Allergens:</h5>
                        <ul>
                            <li>Gluten</li>
                            <li>Dairy</li>
                            <li>Soy</li>
                        </ul>

                        <h5>Edit Plate:</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter your edits here" aria-label="Edit Plate" aria-describedby="edit-plate-button" />
                                <button className="btn btn-primary" type="button" id="edit-plate-button">Save</button>
                        </div>

                        <h5>Price:</h5>
                        <p>$9.99</p>
                    </div>
                </div>
            </div>
        </div>

        // <>
        //     <div className="row">
        //         <div className="col-md-6 ms-auto text-center">
        //             <img src={image} className="img-fluid rounded mx-auto d-block" alt="immagine piatto" />
        //         </div>
        //         <div className="col-md-6 ms-auto">
        //             <div className="row text-center">
        //                 <h5>Descrizione:</h5>
        //                 <p>{description}</p>
        //             </div>
        //             <div className="row text-center">
        //                 <h5>Allergeni:</h5>
        //                 <p>{allergenes}</p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="row text-center">
        //         <form>
        //             <div className="mb-3">
        //                 <label htmlFor="message-text" className="col-form-label">Note:</label>
        //                 <textarea className="form-control" id="message-text" defaultValue={"Scrivi qua eventuali note per la cucina:"} />
        //             </div>
        //         </form>
        //     </div>
        //     <div className="row text-end">
        //         <h2>Prezzo:</h2>
        //         <p>{price}</p>
        //     </div>
        // </>
    )
}