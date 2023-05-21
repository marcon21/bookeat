/**
 * Classe che implementa metodi per la gestione del menu
 */
const Piatto = require('../db/piatto').Piatto;
const { errorRes, successRes } = require('../response');

class GestoreMenu {
  // Metodo per ottenere tutti i piatti del menu
  static async getMenu(res) {
    var categorie = await Piatto.find()
      .distinct("categoria")
      .catch((err) => {
        errorRes(res, err, "Errore nel recupero del menu", 424);
      });

    var piatti = await Piatto.find().catch((err) => {
      errorRes(res, err, "Errore nel recupero del menu", 424);
    });

    var data = {
      categorie: categorie,
      piatti: piatti,
    };
    successRes(res, "OK", data);
  }

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
      ingredientiModificabili: ingredientiModificabili,
    })
      .then((piatto) => {
        successRes(res, "OK", [], 201);
      })
      .catch((err) => {
        errorRes(res, err, "Creazione piatto fallita", 424);
      });
  }

  // Metodo per rimuovere un piatto dal menu, identificato da idPiatto
  static rimuoviPiatto(idPiatto, res) {
    Piatto.deleteOne({
      _id: idPiatto,
    })
      .then((piatto) => {
        successRes(res, "OK", [], 200);
      })
      .catch((err) => {
        errorRes(res, err, "Eliminazione piatto fallita", 424);
      });
  }

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
    res
  ) {
    Piatto.updateOne(
      { _id: idPiatto },
      {
        nome: nome,
        prezzo: prezzo,
        categoria: categoria,
        disponibile: disponibile,
        descrizione: descrizione,
        allergeni: allergeni,
        ingredientiModificabili: ingredientiModificabili,
      }
    )
      .then((piatto) => {
        successRes(res, "OK", [], 200);
      })
      .catch((err) => {
        errorRes(res, err, "Modifica piatto fallita", 424);
      });
  }
}

module.exports = GestoreMenu;
