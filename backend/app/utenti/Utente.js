/**
 * Una macro classe che racchiude tutti gli utenti dei clienti del ristorante
 */
const UtenteAbstract = require("./UtenteAbstract");

class Utente extends UtenteAbstract {


    static inviaOrdine(portata) { /** TODO */ }
    static visualizzaConto() { /** TODO */ }
    static apriConto(nCoperti) { /** TODO */ }
}

module.exports = Utente;