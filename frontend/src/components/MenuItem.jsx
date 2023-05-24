import { makeString } from "../utils"
import Modal from "./Modal"
import PlateSpecs from "./PlateSpecs"

export default function MenuItem({ plate }) {
    let plateCopy = structuredClone(plate)

    plateCopy["prezzo"] = (plate["prezzo"] / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })
    plateCopy["img"] = "/plates/".concat(plate["nome"].replace(/[^a-zA-Z0-9]/g, "")).concat(".jpg")

    const modalId = plateCopy["nome"].replace(/[^a-zA-Z0-9]/g, "").concat("-Modal-").concat(makeString(5))

    function launchModal(modalId) {
        document.getElementById(modalId.concat("Button")).click()
    }

    const onSubmit = (data) => {
        console.log(data);
        // Perform further actions with the form data, e.g., API calls, state updates, etc.
      };

    return (
        <>
            <Modal
                modalId={modalId}
                title={plateCopy["nome"]}
                closeButtonText="Chiudi"
                confirmButtonText="Aggiungi al carrello"
                closeFunction={() => { console.log("close") }}
                confirmFunction={() => { console.log("confirm") }}
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