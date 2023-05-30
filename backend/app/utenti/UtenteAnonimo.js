/**
 * Classe che rappresenta un utente anonimo, ovvero non loggato
 */
const GestoreMenu = require("../gestori/GestoreMenu");


class UtenteAnonimo {


    constructor() {
        if (this.constructor === UtenteAnonimo) {
            throw new TypeError("UtenteAnonimo non puo essere instanziato perché è una classe astratta");
        }
    }


    static registrati(email, password, nome) { /** TODO */ }
    static login(email, password) { /** TODO */ }
    static async getMenu() { return await GestoreMenu.getMenu(); }
}

module.exports = UtenteAnonimo;