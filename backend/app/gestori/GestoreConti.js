/**
 * Classe che gestisce le operazioni sui conti
 */
const Conto = require("../db/conto").Conto;
const FailedDependencyException = require("../exceptions/FailedDependencyException");

class GestoreConti {
  static getConti() {
    /** TODO */
  }
  static getConto(idUtente) {
    /** TODO */
  }
  static getConto(idConto) {
    /** TODO */
  }
  static getStoricoConti() {
    /** TODO */
  }

  /**
   * Metodo per aprire un conto, salvando le sue informazioni nel database
   * 
   * @param idUtente - L'id dell'utente che apre il conto	
   * @param nCoperti - Il numero di coperti del conto
   * 
   * @throws FailedDependencyException - Se la creazione del conto fallisce
   * @throws BadRequestException - Se il numero di coperti è minore di 0
   */
  static async apriConto(idUtente, nCoperti) {

    await Conto.create({
      idUtente: idUtente,
      status: "aperto",
      data: new Date(),
      nCoperti: nCoperti,
      portate: []
    }).then((conto) => {
      console.log("Conto creato con successo");
      return conto.idConto;
    }).catch((err) => {
      console.error(err);
      throw new FailedDependencyException("Errore durante la creazione del conto");
    });
  }
  static chiudiConto(idConto) {
    /** TODO */
  }
  static pagaConto(idConto) {
    /** TODO */
  }
  static aggiungiPortata(
    idConto,
    idPortata,
    nome,
    prezzo,
    ingredientiScelti,
    note,
    priorita
  ) {
    /** TODO */
  }
  static modificaStatusPortata(idPortata, status) {
    /** TODO */
  }
}

module.exports = GestoreConti;
