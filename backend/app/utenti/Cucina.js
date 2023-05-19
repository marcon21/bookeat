/**
 * Classe che rappresenta la cucina del ristorante
 */
const Dipendente = require("./Dipendente");

class Cucina extends Dipendente {


    constructor() {
        if (this.constructor === Cucina) {
            throw new TypeError("Cucina non puo essere instanziato perché è una classe astratta");
        }
    }

    static modificaDisponibilitaMenu(id, disponibilita) { /** TODO */ }
}

module.exports = Cucina;