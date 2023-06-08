/**
 * Classe che rappresenta un tavolo, ovvero un utente in loco
 */
const Utente = require("./Utente");
const GestoreConti = require("../gestori/GestoreConti");
const BadRequestException = require("../exceptions/BadRequestException");

class Tavolo extends Utente {
  constructor() {
    if (this.constructor === Tavolo) {
      throw new TypeError(
        "Tavolo non puo essere instanziato perché è una classe astratta"
      );
    }
  }

  /**
   * Aggiunge portete al conto
   * 
   * @param idUtente l'id dell'utente che aggiunge la portata
   * @param portate le portate da aggiungere
   */
  static async invioOrdine(idUtente, portate) {
    const conto = await GestoreConti.getContoWithUser(idUtente);
    await GestoreConti.aggiungiPortata(conto._id, portate);
  }

  /**
   * Metodo che invia il conto
   */
  static async inviaConto(idUtente) {
    // Controlle se esiste gia un conto con status daPagare
    let daPagare;
    try {
      daPagare = await GestoreConti.getContoDaPagareWithUser(idUtente)
    } catch { }
    if (daPagare != null) { throw new BadRequestException("Esiste gia un conto da pagare per questo utente"); }

    const conto = await GestoreConti.getContoWithUser(idUtente);
    await GestoreConti.inviaConto(conto._id);
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
