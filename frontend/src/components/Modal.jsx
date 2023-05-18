export default function Modal({modalId, title, description, allergenes, price, image}){
    return(
        <>
            <button hidden={true} id = {modalId.concat("Button")} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            // Modal 
            <div class="modal fade" modal-dialog modal-dialog-scrollable id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body ">
                    <div class="row">
                        <div class="col-md-6 ms-auto">
                            <img src={image} class="rounded mx-auto d-block" alt="..."/>
                        </div>
                        <div class="col-md-6 ms-auto">
                            <div class="row">
                                <h2>Description:</h2>
                                <p>{description}</p>
                            </div>
                            <div class="row">
                                <h2>Allergenes:</h2>
                                <p>{allergenes}</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        //specify ingredients changes or options
                        <form>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Note:</label>
                                <textarea class="form-control" id="message-text">type here</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="row">
                        <h2>Price:</h2>
                        <p>{price}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Ordina</button>
                </div>
                </div>
            </div>
            </div>

        </>
    )
}