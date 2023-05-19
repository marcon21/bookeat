/**
 * Classe che implementa metodi per la gestione del menu
 */

const piatto = require('../db/piatto');
const { errorRes, successRes } = require('../response');

const Piatto = require('../db/piatto').Piatto;

class GestoreMenu {


    // Metodo per ottenere tutti i piatti del menu
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

    // Metodo per rimuovere un piatto dal menu, identificato da idPiatto
    static rimuoviPiatto(idPiatto, res) {
        Piatto.deleteOne({
            _id: idPiatto
        }).then((piatto) => {
            successRes(res, "OK", [], 200);
        }).catch((err) => {
            errorRes(res, err, "Eliminazione piatto fallita", 424);
        });
    };

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
        Piatto.updateOne(
            { _id: idPiatto }, {
            nome: nome,
            prezzo: prezzo,
            categoria: categoria,
            disponibile: disponibile,
            descrizione: descrizione,
            allergeni: allergeni,
            ingredientiModificabili: ingredientiModificabili
        }).then((piatto) => {
            successRes(res, "OK", [], 200);
        }).catch((err) => {
            errorRes(res, err, "Modifica piatto fallita", 424);
        });
    };
}

module.exports = GestoreMenu;