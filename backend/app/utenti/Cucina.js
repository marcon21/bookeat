/**
 * Classe che rappresenta la cucina del ristorante
 */
const Dipendente = require("./Dipendente");
const GestoreMenu = require("../gestori/GestoreMenu");

class Cucina extends Dipendente {


    constructor() {
        if (this.constructor === Cucina) {
            throw new TypeError("Cucina non puo essere instanziato perché è una classe astratta");
        }
    }

    static async modificaPiatto(
        idPiatto,
        nome,
        prezzo,
        categoria,
        disponibile,
        descrizione,
        allergeni,
        ingredientiModificabili
      ) {
        await GestoreMenu.modificaPiatto(
          idPiatto,
          nome,
          prezzo,
          categoria,
          disponibile,
          descrizione,
          allergeni,
          ingredientiModificabili
        );
      }
}

module.exports = Cucina;