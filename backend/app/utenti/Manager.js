/**
 * Classe che raprpesenta il manager del ristorante
 */
const Dipendente = require("./Dipendente");
const GestoreMenu = require("../gestori/GestoreMenu");


class Manager extends Dipendente {

    // Metodo per aggiungere un piatto al menu
    static aggiungiPiatto(
        nome,
        prezzo,
        categoria,
        disponibile,
        descrizione,
        allergeni,
        ingredientiModificabili,
        res) {

        GestoreMenu.aggiungiPiatto(
            nome,
            prezzo,
            categoria,
            disponibile,
            descrizione,
            allergeni,
            ingredientiModificabili,
            res
        );
    }

    // Metodo per rimuovere un piatto dal menu, identificato da idPiatto
    static rimuoviPiatto(idPiatto, res) { GestoreMenu.rimuoviPiatto(idPiatto, res); };

    // Metodo per modificare un piatto del menu, identificato da idPiatto
    static modificaPiatto(
        idPiatto,
        nome,
        prezzo,
        categoria,
        disponibile,
        descrizione,
        allergeni,
        ingredientiModificabili,
        res) {

        GestoreMenu.modificaPiatto(
            idPiatto,
            nome,
            prezzo,
            categoria,
            disponibile,
            descrizione,
            allergeni,
            ingredientiModificabili,
            res);
    }
}

module.exports = Manager;
