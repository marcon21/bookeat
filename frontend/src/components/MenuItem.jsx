import { makeString } from "../utils"
import Modal from "./Modal"
import PlateSpecs from "./PlateSpecs"

export default function MenuItem({ name, price, description, image = "/plate.jpg" }) {
    const modalId = name.replace(/[^a-zA-Z0-9]/g, "").concat("-Modal-").concat(makeString(5))

    function launchModal(modalId) {
        document.getElementById(modalId.concat("Button")).click()
    }

    return (
        <>
            <Modal
                modalId={modalId}
                title={name}
                closeButtonText="Chiudi"
                confirmButtonText="Aggiungi al carrello"
                closeFunction={() => { console.log("close") }}
                confirmFunction={() => { console.log("confirm") }}
            >
                <PlateSpecs
                    image={image}
                    description={description}
                    allergenes={"a"}
                    price={price} />
            </Modal>
            <div className="card h-100" style={{ width: 15 + 'em' }} onClick={() => { launchModal(modalId) }}>
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{price}$</h6>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </>
    )
}