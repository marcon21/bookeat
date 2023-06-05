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

    /**
     * Metodo che apre un conto ed invia automaticamente le portate
     * 
     * @param {*} idUtente L'id dell'utente che apre il conto
     * @param {*} portate Le portate da inviare
     */
    static async invioOrdine(idUtente, portate) {
        
        let idConto = await GestoreConti.apriConto(idUtente, 0);
        await GestoreConti.aggiungiPortata(idConto, portate);
    };

    static modificaEmail(id, email) { /** TODO */ }
    static modificaPassword(id, vecchiaPassword, nuovaPassword) { /** TODO */ }
    static modificaGoogleAccount() { /** TODO */ }
    static modificaNome() { /** TODO */ }
    static eliminaAccount() { /** TODO */ }
    static async chiudiConto(idUtente) {

        // TODO Pagamento Conto

        idConto = await GestoreConti.getContoAperto(idUtente);
        GestoreConti.chiudiConto(idConto);
    }
}

module.exports = UtenteLoggato;