/**
 * Classe che implementa metodi per la gestione del menu
 */

const piatto = require('../db/piatto');
const { errorRes, successRes } = require('../response');

const Piatto = require('../db/piatto').Piatto;

class GestoreMenu {


    // Metodo per ottenere il menu
    static async getMenu() { return await Piatto.find().exec(); };

    // Metodo per aggiungere un piatto al menu
    static async aggiungiPiatto(
        nome,
        prezzo,
        categoria,
        disponibile,
        descrizione,
        allergeni,
        ingredientiModificabili,
        res
    ) {
        Piatto.create({
            nome: nome,
            prezzo: prezzo,
            categoria: categoria,
            disponibile: disponibile,
            descrizione: descrizione,
            allergeni: allergeni,
            ingredientiModificabili: ingredientiModificabili
        }).then((piatto) => {
            successRes(res, "OK", [], 201);
        }).catch((err) => {
            errorRes(res, err, "Creazione piatto fallita", 424);
        });
    };

    static rimuoviPiatto() {
        //TODO
    };

    static modificaPiatto() {
        //TODO
    };

    static modificaDisponibilita() {
        //TODO
    };
}

module.exports = GestoreMenu;