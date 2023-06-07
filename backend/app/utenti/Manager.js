/**
 * Classe che raprpesenta il manager del ristorante
 */
const Dipendente = require("./Dipendente");
const GestoreMenu = require("../gestori/GestoreMenu");
const GestoreProfilo = require("../gestori/GestoreProfilo");

class Manager extends Dipendente {
  constructor() {
    if (this.constructor === Manager) {
      throw new TypeError(
        "Manager non puo essere instanziato perché è una classe astratta"
      );
    }
  }

  /**
   * Metodo per aggiungere un piatto al menu
   *
   * @param nome - Il nome del piatto
   * @param prezzo - Il prezzo del piatto
   * @param categoria - La categoria del piatto
   * @param disponibile - Indica se il piatto è disponibile
   * @param descrizione - La descrizione del piatto
   * @param allergeni - Gli allergeni del piatto
   * @param ingredientiModificabili - Gli ingredienti modificabili del piatto
   */
  static async aggiungiPiatto(
    nome,
    prezzo,
    categoria,
    disponibile,
    descrizione,
    allergeni,
    ingredientiModificabili
  ) {
    await GestoreMenu.aggiungiPiatto(
      nome,
      prezzo,
      categoria,
      disponibile,
      descrizione,
      allergeni,
      ingredientiModificabili
    );
  }

  /**
   *  Metodo per rimuovere un piatto dal menu, identificato da idPiatto
   *
   * @param idPiatto - L'id del piatto da rimuovere
   */
  static async rimuoviPiatto(idPiatto) {
    await GestoreMenu.rimuoviPiatto(idPiatto);
  }

  /**
   * Metodo per modificare un piatto del menu, identificato da idPiatto
   *
   * @param nome - Il nome del piatto
   * @param prezzo - Il prezzo del piatto
   * @param categoria - La categoria del piatto
   * @param disponibile - Indica se il piatto è disponibile
   * @param descrizione - La descrizione del piatto
   * @param allergeni - Gli allergeni del piatto
   * @param ingredientiModificabili - Gli ingredienti modificabili del piatto
   */
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

  static async modificaNome(id, nome) {
    await GestoreProfilo.modificaNome(id, nome);
  }

  static async modificaPassword(id, vecchiaPassword, nuovaPassword) {
    return await GestoreProfilo.modificaPassword(id, vecchiaPassword, nuovaPassword);
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

module.exports = Manager;
