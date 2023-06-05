/**
 * Classe che gestisce le operazioni sui conti
 */
const Conto = require("../db/conto").Conto;
const Piatto = require("../db/piatto").Piatto;
const FailedDependencyException = require("../exceptions/FailedDependencyException");
const NotFoundException = require("../exceptions/NotFoundException");

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
   */
  static async apriConto(idUtente, nCoperti) {

    return await Conto.create({
      idUtente: idUtente,
      status: "aperto",
      data: new Date(),
      nCoperti: nCoperti,
      portate: []
    }).then((conto) => {
      console.log("Conto creato con successo con id: " + conto._id);
      return conto._id;
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

  static async aggiungiPortata(idConto, portate) {

    console.log("Id Conto: " + idConto);

    await portate.forEach(async function (portata) {

      console.log("Id Piatto: " + portata.idPiatto);


      const piatto = await Piatto.findOne({ _id: portata.idPiatto })
      if (piatto == null) { throw new NotFoundException("Errore durante il recupero del piatto"); }

      let prezzo = piatto.prezzo;

      // TODO Implementare il calcolo del prezzo in base agli ingredienti modificabili

      let _portata = {
        idPiatto: portata.idPiatto,
        prezzo: prezzo,
        ingredientiScelti: portata.ingredientiScelti,
        note: portata.note,
        status: 0,
        priorita: portata.priorita
      }
      const conto = await Conto.findOne({ _id: idConto }).catch((err) => {
        console.error(err);
        throw new NotFoundException("Errore durante il recupero del conto");
      });

      conto.portate.push(_portata);
      conto.save().then((conto) => {
        console.log("Portata aggiunta con successo " + conto._id);
      }).catch((err) => {
        console.error(err);
        throw new FailedDependencyException("Errore durante l'aggiunta della portata");
      });
    });
  }
  static modificaStatusPortata(idPortata, status) {
    /** TODO */
  }
}

module.exports = GestoreConti;
