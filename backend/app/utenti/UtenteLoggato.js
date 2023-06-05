/**
 * Classe che rappresenta l'utente loggato
 */
const Utente = require("./Utente");
const GestoreConti = require("../gestori/GestoreConti");

class UtenteLoggato extends Utente {


    constructor() {
        if (this.constructor === UtenteLoggato) {
            throw new TypeError("UtenteLoggato non puo essere instanziato perché è una classe astratta");
        }
    }

    static async invioOrdine(idUtente, portate) {
        let idConto = await GestoreConti.apriConto(idUtente, 0);
        await GestoreConti.aggiungiPortata(idConto, portate);
    };

    static modificaEmail(id, email) { /** TODO */ }
    static modificaPassword(id, vecchiaPassword, nuovaPassword) { /** TODO */ }
    static modificaGoogleAccount() { /** TODO */ }
    static modificaNome() { /** TODO */ }
    static eliminaAccount() { /** TODO */ }
    static chiudiConto() { /** TODO */ }
}

module.exports = UtenteLoggato;