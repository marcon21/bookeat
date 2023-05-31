import { makeString } from "../utils"
import Modal from "./Modal"
import PlateSpecs from "./PlateSpecs"

export default function MenuItem({ plate, addToCheckout }) {
    let plateCopy = structuredClone(plate)

    plateCopy["prezzo"] = (plate["prezzo"] / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })
    plateCopy["img"] = "/plates/".concat(plate["nome"].replace(/[^a-zA-Z0-9]/g, "")).concat(".jpg")

    const modalId = plateCopy["nome"].replace(/[^a-zA-Z0-9]/g, "").concat("-Modal-").concat(makeString(5))

    function launchModal(modalId) {
        document.getElementById(modalId.concat("Button")).click()
    }

    const onSubmit = (data) => {
        let item = {
            "_id": plate["_id"],
            "nome": plate["nome"],
            "prezzo": plate["prezzo"],
            "ingredientiScelti": data["ingredients"],
            "note": data["notes"],
            "status": 0,
            "prioritá": 0
        }
        addToCheckout(item)
    };

    return (
        <>
            <Modal
                modalId={modalId}
                title={plateCopy["nome"]}
                closeButtonText="Chiudi"
                confirmButtonText="Aggiungi al carrello"
                closeFunction={() => { console.log("close") }}
                confirmFunction={() => { document.getElementById(plate._id.concat("-formSubmitButton")).click() }}
            >
                <PlateSpecs plate={plateCopy} onSubmit={onSubmit} />
            </Modal>
            <div className="card h-100" style={{ width: 15 + 'em' }} onClick={() => { launchModal(modalId) }}>
                <img src={plateCopy["img"]} className="card-img-top" alt={plateCopy["img"]} />
                <div className="card-body">
                    <h5 className="card-title">{plateCopy["nome"]}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{plateCopy["prezzo"]}</h6>
                    <p className="card-text">{plateCopy["descrizione"]}</p>
                </div>
            </div>
        </>
    )
}