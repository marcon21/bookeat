/**
 * Classe che rappresenta un utente anonimo, ovvero non loggato
 */
const GestoreMenu = require("../gestori/GestoreMenu");
const GestoreMenu = require("../gestori/GestoreProfilo");

class UtenteAnonimo {
  constructor() {
    if (this.constructor === UtenteAnonimo) {
      throw new TypeError(
        "UtenteAnonimo non puo essere instanziato perché è una classe astratta"
      );
    }
  }

  static registrati(email, password, nome) {
    /** TODO */
  }
  static login(email, password) {
    /** TODO */
  }
  static async getMenu() {
    return await GestoreMenu.getMenu();
  }

  static async generaJWT(id, email) {
    return await GestoreProfilo.generaJWT(id, email);
  }
}

module.exports = UtenteAnonimo;
