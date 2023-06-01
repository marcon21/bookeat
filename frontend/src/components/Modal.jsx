export default function Modal({ modalId, title, closeButtonText = "Chiudi", closeFunction, confirmButtonText = "Conferma", confirmFunction, showButtons, children }) {
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
                        {showButtons &&
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeFunction}>{closeButtonText}</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={confirmFunction}>{confirmButtonText}</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}