/**
 * Classe che implementa metodi per la gestione del menu
 */

const Piatto = require('../db/piatto').Piatto;

class GestoreMenu {


    // Metodo per ottenere il menu
    static async getMenu() { return await Piatto.find().exec(); };

    // Metodo per aggiungere un piatto al menu
    static async aggiungiPiatto(
        nome,
        prezzo,
        descrizione,
        allergeni,
        ingredientiModificabili
    ) {
        await Piatto.create({
            nome: nome,
            prezzo: prezzo,
            descrizione: descrizione,
            allergeni: allergeni,
            ingredientiModificabili: ingredientiModificabili
        }, function (err, result) {  //crea il piatto nel db
            if (err) {
                errorRes(res, err, 'Creazione piatto fallita', statusCode = 424);
            } else {
                successRes(res, 'OK', [], statusCode = 201);
            }
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