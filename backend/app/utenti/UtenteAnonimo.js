/**
 * Classe che rappresenta un utente anonimo, ovvero non loggato
 */
const GestoreMenu = require("../gestori/GestoreMenu");
const GestoreProfilo = require("../gestori/GestoreProfilo");

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

  static async creaAccount(nome, tipo, email, password, googleId) {
    return await GestoreProfilo.creaAccount(
      nome,
      tipo,
      email,
      password,
      googleId
    );
  }
}

module.exports = UtenteAnonimo;
