/**
 * Classe che implementa metodi per la gestione del menu
 */
const Piatto = require('../db/piatto').Piatto;
const FailedDependencyException = require('../exceptions/FailedDependencyException');

class GestoreMenu {


  /** 
   * Metodo per ottenere tutti i piatti del menu
   * 
   * @returns data - Un oggetto contenente le categorie e i piatti del menu
   * 
   * @throws FailedDependencyException - Se il recupero del menu fallisce
   */
  static async getMenu() {
    var categorie = await Piatto.find().distinct("categoria").catch((err) => {
      console.error(err);
      throw new FailedDependencyException("Errore nel recupero del menu");
    });

    var piatti = await Piatto.find().catch((err) => {
      console.error(err);
      throw new FailedDependencyException("Errore nel recupero del menu");
    });

    var data = {
      categorie: categorie,
      piatti: piatti,
    };

    return data;
  }

  /**
   * Metodo per aggiungere un piatto al menu
   * 
   * @param nome - Il nome del piatto
   * @param prezzo - Il prezzo del piatto
   * @param categoria - La categoria del piatto
   * @param disponibile - Indica se il piatto è disponibile
   * @param descrizione - La descrizione del piatto
   * @param allergeni - Gli allergeni del piatto
   * @param ingredientiModificabili - Gli ingredienti modificabili del piatto
   * 
   * @throws FailedDependencyException - Se la creazione del piatto fallisce
   */
  static async aggiungiPiatto(
    nome,
    prezzo,
    categoria,
    disponibile,
    descrizione,
    allergeni,
    ingredientiModificabili,
  ) {
    await Piatto.create({
      nome: nome,
      prezzo: prezzo,
      categoria: categoria,
      disponibile: disponibile,
      descrizione: descrizione,
      allergeni: allergeni,
      ingredientiModificabili: ingredientiModificabili,
    }).catch((err) => {
      console.error(err);
      throw new FailedDependencyException("Creazione piatto fallita");
    });
  }

  /**
   *  Metodo per rimuovere un piatto dal menu, identificato da idPiatto
   * 
   * @param idPiatto - L'id del piatto da rimuovere
   * 
   * @throws FailedDependencyException - Se la rimozione del piatto fallisce
   */
  static async rimuoviPiatto(idPiatto) {
    await Piatto.deleteOne({ _id: idPiatto }).catch((err) => {
      console.error(err);
      throw new FailedDependencyException("Eliminazione piatto fallita");
    });
  }

  /**
   * Metodo per modificare un piatto del menu, identificato da idPiatto
   * 
   * @param nome - Il nome del piatto
   * @param prezzo - Il prezzo del piatto
   * @param categoria - La categoria del piatto
   * @param disponibile - Indica se il piatto è disponibile
   * @param descrizione - La descrizione del piatto
   * @param allergeni - Gli allergeni del piatto
   * @param ingredientiModificabili - Gli ingredienti modificabili del piatto
   * 
   * @throws FailedDependencyException - Se la modifica del piatto fallisce
   */
  static async modificaPiatto(
    idPiatto,
    nome,
    prezzo,
    categoria,
    disponibile,
    descrizione,
    allergeni,
    ingredientiModificabili
  ) {
    await Piatto.updateOne(
      { _id: idPiatto },
      {
        nome: nome,
        prezzo: prezzo,
        categoria: categoria,
        disponibile: disponibile,
        descrizione: descrizione,
        allergeni: allergeni,
        ingredientiModificabili: ingredientiModificabili,
      }).catch((err) => {
        console.error(err);
        throw new FailedDependencyException("Modifica piatto fallita");
      });
  }
}

module.exports = GestoreMenu;
