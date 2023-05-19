/**
 * La classe padre di tutti i tipi di utente disponibili sull'applicazione
 */
const GestoreMenu = require("../gestori/GestoreMenu");
const errorRes = require("../response").errorRes;

class UtenteAbstract {


    constructor() {
        if (this.constructor === UtenteAbstract) {
            throw new TypeError("UtenteAbstract non puo essere instanziato perché è una classe astratta");
        }
    }

    // Metodo per ottenere tutti i piatti del menu
    static getMenu() { GestoreMenu.getMenu(); };

    // Metodo per aggiungere un piatto al menu
    static aggiungiPiatto(
        nome,
        prezzo,
        categoria,
        disponibile,
        descrizione,
        allergeni,
        ingredientiModificabili,
        res) {
        errorRes(
            res,
            "Unauthorized - Accedi con un account autorizzato e riprova",
            "Unauthorized - Accedi con un account autorizzato e riprova",
            401
        );
    }

    // Metodo per rimuovere un piatto dal menu, identificato da idPiatto
    static rimuoviPiatto(idPiatto, res) {
        errorRes(
            res,
            "Unauthorized - Accedi con un account autorizzato e riprova",
            "Unauthorized - Accedi con un account autorizzato e riprova",
            401
        );
    };

    // Metodo per modificare un piatto del menu, identificato da idPiatto
    static modificaPiatto(
        idPiatto,
        nome,
        prezzo,
        categoria,
        disponibile,
        descrizione,
        allergeni,
        ingredientiModificabili,
        res) {
        errorRes(
            res,
            "Unauthorized - Accedi con un account autorizzato e riprova",
            "Unauthorized - Accedi con un account autorizzato e riprova",
            401
        );
    }
}

module.exports = UtenteAbstract;