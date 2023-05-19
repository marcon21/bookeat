export default function Modal({ modalId, title, closeButtonText="Chiudi", closeFunction, confirmButtonText="Conferma", confirmFunction, children }) {
    return (
        <>
            <button hidden={true} id={modalId.concat("Button")} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#".concat(modalId)}>
                Launch modal
            </button>

            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={modalId.concat("Label")} aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={modalId.concat("Label")}>{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeFunction}>{closeButtonText}</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={confirmFunction}>{confirmButtonText}</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="modal fade" modal-dialog="true" modal-dialog-scrollable="true" id={modalId} tabIndex={-1} aria-labelledby={modalId.concat("Label")} aria-hidden="true">
                <div className="modal-dialog" modal-dialog-scrollable="true" modal-dialog-centered="true">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={modalId.concat("Label")}>{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="row">
                        <div className="col-md-6 ms-auto text-center">
                            <img src={image} className="rounded mx-auto d-block" alt="..." />
                        </div>
                        <div className="col-md-6 ms-auto">
                            <div className="row text-center">
                                <h2>Description:</h2>
                                <p>{description}</p>
                            </div>
                            <div className="row text-center">
                                <h2>Allergenes:</h2>
                                <p>{allergenes}</p>
                            </div>
                        </div>
                        </div>
                        <div className="row text-center">
                        <form>
                            <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Note:</label>
                            <textarea className="form-control" id="message-text" defaultValue={"type here"} />
                            </div>
                        </form>
                        </div>
                        <div className="row text-end">
                        <h2>Price:</h2>
                        <p>{price}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Ordina</button>
                    </div>
                    </div>
                </div>
            </div> */}





            {/* 
            <div className="modal fade" modal-dialog="true" modal-dialog-scrollable id={modalId} tabindex="-1" aria-labelledby={modalId.concat("Label")} aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={modalId.concat("Label")}>{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6 ms-auto">
                                <img src={image} className="rounded mx-auto d-block" alt="..."/>
                            </div>
                            <div className="col-md-6 ms-auto">
                                <div className="row">
                                    <h2>Description:</h2>
                                    <p>{description}</p>
                                </div>
                                <div className="row">
                                    <h2>Allergenes:</h2>
                                    <p>{allergenes}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            //specify ingredients changes or options
                            <form>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Note:</label>
                                    <textarea className="form-control" id="message-text">type here</textarea>
                                </div>
                            </form>
                        </div>
                        <div className="row">
                            <h2>Price:</h2>
                            <p>{price}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Ordina</button>
                    </div>
                    </div>
                </div>
            </div> */}

        </>
    )
}




