/**
 * La classe padre di tutti i tipi di utente disponibili sull'applicazione
 */
const errorRes = require("../response").errorRes;
const UnauthorizedException = require("../exceptions/UnauthorizedException");

class UtenteAbstract {


    constructor() {
        if (this.constructor === UtenteAbstract) {
            throw new TypeError("UtenteAbstract non puo essere instanziato perché è una classe astratta");
        }
    }

    /**
     * Metodo per aggiungere un piatto al menu
     * 
     * @param nome - Il nome del piatto
     * @param prezzo - Il prezzo del piatto
     * @param categoria - La categoria del piatto
     * @param disponibile - Indica se il piatto è disponibile
     * @param descrizione - La descrizione del piatto
     * @param allergeni - Gli allergeni del piatto
     * @param ingredientiModificabili - Gli ingredienti modificabili del piatto
     * 
     * @throws UnauthorizedException - Se l'utente non è autorizzato ad eseguire l'operazione
     */
    static aggiungiPiatto(
        nome,
        prezzo,
        categoria,
        disponibile,
        descrizione,
        allergeni,
        ingredientiModificabili
    ) { throw new UnauthorizedException("Unauthorized - Accedi con un account autorizzato e riprova"); }

    /**
     *  Metodo per rimuovere un piatto dal menu, identificato da idPiatto
     * 
     * @param idPiatto - L'id del piatto da rimuovere
     * 
     * @throws UnauthorizedException - Se l'utente non è autorizzato ad eseguire l'operazione
     */
    static rimuoviPiatto(idPiatto) {

        throw new UnauthorizedException("Unauthorized - Accedi con un account autorizzato e riprova");
    };

    /**
     * Metodo per modificare un piatto del menu, identificato da idPiatto
     * 
     * @param nome - Il nome del piatto
     * @param prezzo - Il prezzo del piatto
     * @param categoria - La categoria del piatto
     * @param disponibile - Indica se il piatto è disponibile
     * @param descrizione - La descrizione del piatto
     * @param allergeni - Gli allergeni del piatto
     * @param ingredientiModificabili - Gli ingredienti modificabili del piatto
     * 
     * @throws UnauthorizedException - Se l'utente non è autorizzato ad eseguire l'operazione
     */
    static modificaPiatto(
        idPiatto,
        nome,
        prezzo,
        categoria,
        disponibile,
        descrizione,
        allergeni,
        ingredientiModificabili
    ) {

        throw new UnauthorizedException("Unauthorized - Accedi con un account autorizzato e riprova");
    }

    /**
     * Metodo per aprire un conto, salvando le sue informazioni nel database
     * 
     * @param idUtente - L'id dell'utente che apre il conto	
     * @param nCoperti - Il numero di coperti del conto
     * 
     * @throws FailedDependencyException - Se la creazione del conto fallisce
     * @throws UnauthorizedException - Se l'utente non è autorizzato ad eseguire l'operazione
    */
    static async apriConto(idUtente, nCoperti) { throw new UnauthorizedException("Unauthorized - Accedi con un account autorizzato e riprova"); }

     /**
     * Metodo che apre un conto ed invia automaticamente le portate
     * 
     * @param {*} idUtente L'id dell'utente che apre il conto
     * @param {*} portate Le portate da inviare
     */
     static async invioOrdine(idUtente, portate) { throw new UnauthorizedException("Unauthorized - Accedi con un account autorizzato e riprova"); }
}

module.exports = UtenteAbstract;