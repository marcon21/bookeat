/**
 * Classe che rappresenta l'utente loggato
 */
const GestoreProfilo = require("../gestori/GestoreProfilo");
const Utente = require("./Utente");
const GestoreConti = require("../gestori/GestoreConti");
const UnauthorizedException = require("../exceptions/UnauthorizedException");
const NotFoundException = require("../exceptions/NotFoundException");

const User = require("../db/utente").User;

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
  static async linkGoogleAccount(email, googleId) {
    await GestoreProfilo.linkGoogleAccount(email, googleId);
  }

  static async modificaNome(id, nome) {
    await GestoreProfilo.modificaNome(id, nome);
  }

  static async eliminaAccount(id, password) {
    const user = await User.findById(id).catch((err) => {
      throw new NotFoundException("Errore durante il recupero dell'utente");
    });

    if (!user) {
      throw new NotFoundException("Errore durante il recupero dell'utente");
    }

    // Verifica che la vecchia password fornita corrisponda con password corrente
    const valid = await user.isValidPassword(password);
    if (!valid) {
      throw new UnauthorizedException("Password errata");
    }
    await GestoreProfilo.eliminaAccount(id);
  }

  /**
     * Metodo che apre un conto ed invia automaticamente le portate
     * 
     * @param {*} idUtente L'id dell'utente che apre il conto
     * @param {*} portate Le portate da inviare
     */
  static async invioOrdine(idUtente, portate) {

    let idConto = await GestoreConti.apriConto(idUtente, 0);
    await GestoreConti.aggiungiPortata(idConto, portate);
  };

  static async chiudiConto() {
    // TODO Pagamento Conto

    idConto = await GestoreConti.getContoAperto(idUtente);
    GestoreConti.chiudiConto(idConto);
  }
}

module.exports = UtenteLoggato;
