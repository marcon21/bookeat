/**
 * Classe che rappresenta un utente anonimo, ovvero non loggato
 */
const GestoreMenu = require("../gestori/GestoreMenu");


class UtenteAnonimo {


    static registrati(email, password, nome) { /** TODO */ }
    static login(email, password) { /** TODO */ }
    static getMenu() { GestoreMenu.getMenu(); }
}

module.exports = UtenteAnonimo;