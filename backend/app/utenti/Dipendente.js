/**
 * Una macro classe che racchiude tutti i dipendenti del ristorante
 */
const UtenteAbstract = require("./UtenteAbstract");

class Dipendente extends UtenteAbstract {


    static visualizzaConti() { /** TODO */ }
    static visualizzaConto(id) { /** TODO */ }
    static modificaStatusPortata(idPortata, status) { /** TODO */ }
    static notificaProblematiche(id, mesasggio) { /** TODO */ }
}

module.exports = Dipendente;
