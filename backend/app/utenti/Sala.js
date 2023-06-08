/**
 * Classe che rappresenta i vari camerieri del ristorante
 */
const Dipendente = require("./Dipendente");
const GestoreConti = require("../gestori/GestoreConti");

class Sala extends Dipendente {


    constructor() {
        if (this.constructor === Sala) {
            throw new TypeError("Sala non puo essere instanziato perché è una classe astratta");
        }
    }

    static nuovaPrenotazione(idTavolo, data, nominativo, nCoperti) { /** TODO */ }
    static rimuoviPrenotazione(idPrenotazione) { /** TODO */ }

    /**
     * Metodo per chiudere un conto
     *
     * @param idConto - L'id conto da chiudere
     *
     * @throws FailedDependencyException - Se la chiusura del conto fallisce
    */
    static async chiudiConto(idConto) { await GestoreConti.chiudiConto(idConto); }

    static vediPrenotazioni() { /** TODO */ }
    static visualizzaTavoli() { /** TODO */ }
    static visualizzaTavolo(idTavolo) { /** TODO */ }
}

module.exports = Sala;