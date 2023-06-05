/**
 * Classe che rappresenta un tavolo, ovvero un utente in loco
 */
const Utente = require("./Utente");

class Tavolo extends Utente {


    constructor() {
        if (this.constructor === Tavolo) {
            throw new TypeError("Tavolo non puo essere instanziato perché è una classe astratta");
        }
    }


    static async invioOrdine(portate) { /** TODO */ };

    static chiamaCameriere() { /** TODO */ }
    static getPrenotazione() { /** TODO */ }
    static getStatus() { /** TODO */ }
}

module.exports = Tavolo;