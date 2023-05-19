import { makeString } from "../utils"
import Modal from "./Modal"
import PlateSpecs from "./PlateSpecs"

export default function MenuItem({ plate }) {
    let plateExample = {
        "_id": 1,
        "nome": "Pizza Margherita",
        "prezzo": 500,
        "categoria": {
          "primaria": "Pizza"
        },
        "disponibile": 1,
        "descrizione": "Pizza con mozzarella e pomodoro",
        "allergeni": [
          "Glutine",
          "Lattosio"
        ],
        "ingredientiModificabili": [
          "Mozzarella",
          "Salamino",
          "Funghi"
        ]
      }
    
    plate["prezzo"] = (price / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })
    plate["img"] = "/images/plates/".concat(plate["nome"].replace(/[^a-zA-Z0-9]/g, "")).concat(".jpg")

    const modalId = plate["nome"].replace(/[^a-zA-Z0-9]/g, "").concat("-Modal-").concat(makeString(5))

    function launchModal(modalId) {
        document.getElementById(modalId.concat("Button")).click()
    }

    return (
        <>
            <Modal
                modalId={modalId}
                title={plate["nome"]}
                closeButtonText="Chiudi"
                confirmButtonText="Aggiungi al carrello"
                closeFunction={() => { console.log("close") }}
                confirmFunction={() => { console.log("confirm") }}
            >
                <PlateSpecs plate={plate} />
            </Modal>
            <div className="card h-100" style={{ width: 15 + 'em' }} onClick={() => { launchModal(modalId) }}>
                <img src={plate["img"]} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{plate["nome"]}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{plate["prezzo"]}</h6>
                    <p className="card-text">{plate["descrizione"]}</p>
                </div>
            </div>
        </>
    )
}