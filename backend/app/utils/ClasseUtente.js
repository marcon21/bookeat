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
    "UtenteAbstract": UtenteAbstract,
    "UtenteAnonimo": UtenteAnonimo,
    "Utente": Utente,
    "Dipendente": Dipendente,
    "Tavolo": Tavolo,
    "UtenteLoggato": UtenteLoggato,
    "Cucina": Cucina,
    "Sala": Sala,
    "Manager": Manager
}

class ClasseUtente {


    static getClasseUtente(userType) {
        return classeUtente[userType];
    }
}

module.exports = ClasseUtente;