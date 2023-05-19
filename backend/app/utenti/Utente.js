/**
 * Una macro classe che racchiude tutti gli utenti dei clienti del ristorante
 */
const UtenteAbstract = require("./UtenteAbstract");

class Utente extends UtenteAbstract {


    constructor() {
        if (this.constructor === Utente) {
            throw new TypeError("Utente non puo essere instanziato perché è una classe astratta");
        }
    }

    static inviaOrdine(portata) { /** TODO */ }
    static visualizzaConto() { /** TODO */ }
    static apriConto(nCoperti) { /** TODO */ }
}

module.exports = Utente;