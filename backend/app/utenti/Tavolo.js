/**
 * Classe che rappresenta un tavolo, ovvero un utente in loco
 */
const Utente = require("./Utente");
const GestoreConti = require("../gestori/GestoreConti");

class Tavolo extends Utente {
  constructor() {
    if (this.constructor === Tavolo) {
      throw new TypeError(
        "Tavolo non puo essere instanziato perché è una classe astratta"
      );
    }
  }

  static async invioOrdine(idUtente, portate) {
    const conto = await GestoreConti.getContoWithUser(idUtente);
    await GestoreConti.aggiungiPortata(conto._id, portate);
    console.log("askjndkjasdnjk22332");
  }

  static chiamaCameriere() {
    /** TODO */
  }
  static getPrenotazione() {
    /** TODO */
  }
  static getStatus() {
    /** TODO */
  }
}

module.exports = Tavolo;
