/**
 * Classe che rappresenta i vari camerieri del ristorante
 */
const Dipendente = require("./Dipendente");

class Sala extends Dipendente {


    constructor() {
        if (this.constructor === Sala) {
            throw new TypeError("Sala non puo essere instanziato perché è una classe astratta");
        }
    }

    static nuovaPrenotazione(idTavolo, data, nominativo, nCoperti) { /** TODO */ }
    static rimuoviPrenotazione(idPrenotazione) { /** TODO */ }
    static chiudiConto(idConto) { /** TODO */ }
    static vediPrenotazioni() { /** TODO */ }
    static visualizzaTavoli() { /** TODO */ }
    static visualizzaTavolo(idTavolo) { /** TODO */ }
}

module.exports = Sala;