/**
 * Classe che rappresenta l'utente loggato
 */
const GestoreProfilo = require("../gestori/GestoreProfilo");
const Utente = require("./Utente");

class UtenteLoggato extends Utente {
  constructor() {
    if (this.constructor === UtenteLoggato) {
      throw new TypeError(
        "UtenteLoggato non puo essere instanziato perché è una classe astratta"
      );
    }
  }

  static modificaEmail(id, email) {
    /** TODO */
  }
  static async modificaPassword(id, vecchiaPassword, nuovaPassword) {
    await GestoreProfilo.modificaPassword(id, vecchiaPassword, nuovaPassword);
  }
  static modificaGoogleAccount() {
    /** TODO */
  }
  static async modificaNome(id, nome) {
    await GestoreProfilo.modificaNome(id, nome);
  }
  static eliminaAccount() {
    /** TODO */
  }
  static chiudiConto() {
    /** TODO */
  }
}

module.exports = UtenteLoggato;
