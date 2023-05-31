/**
 * Una macro classe che racchiude tutti gli utenti dei clienti del ristorante
 */
const UtenteAbstract = require("./UtenteAbstract");
const GestoreConto = require("../gestori/GestoreConti");

class Utente extends UtenteAbstract {


    constructor() {
        if (this.constructor === Utente) {
            throw new TypeError("Utente non puo essere instanziato perché è una classe astratta");
        }
    }

    static inviaOrdine(portata) { /** TODO */ }
    static visualizzaConto() { /** TODO */ }

    /**
     * Metodo per aprire un conto, salvando le sue informazioni nel database
     * 
     * @param idUtente - L'id dell'utente che apre il conto	
     * @param nCoperti - Il numero di coperti del conto
     * 
     * @throws FailedDependencyException - Se la creazione del conto fallisce
     * @throws BadRequestException - Se il numero di coperti è minore di 0
    */
    static async apriConto(idUtente, nCoperti) { return await GestoreConto.apriConto(idUtente, nCoperti); }
}

module.exports = Utente;