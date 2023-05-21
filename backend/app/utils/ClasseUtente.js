/**
 * Classe di utility per ricavare la classe dato un tipo di utente
 */

const Cucina = require("../utenti/Cucina");
const Dipendente = require("../utenti/Dipendente");
const Manager = require("../utenti/Manager");
const Sala = require("../utenti/Sala");
const Tavolo = require("../utenti/Tavolo");
const Utente = require("../utenti/Utente");
const UtenteAbstract = require("../utenti/UtenteAbstract");
const UtenteAnonimo = require("../utenti/UtenteAnonimo");
const UtenteLoggato = require("../utenti/UtenteLoggato");

const classeUtente = {
  UtenteAbstract: UtenteAbstract,
  UtenteAnonimo: UtenteAnonimo,
  Utente: Utente,
  Dipendente: Dipendente,
  Tavolo: Tavolo,
  UtenteLoggato: UtenteLoggato,
  Cucina: Cucina,
  Sala: Sala,
  Manager: Manager,
};

class ClasseUtente {
  constructor() {
    if (this.constructor === ClasseUtente) {
      throw new TypeError(
        "ClasseUtente non puo essere instanziato perché è una classe astratta"
      );
    }
  }

  // Metodo che restituisce la classe utente in base al tipo di utente
  static getClasseUtente(userType) {
    return classeUtente[userType];
  }
}

module.exports = ClasseUtente;
