/**
 * Definizione delle route per il menu
 */
var express = require('express');
var router = express.Router();
const { errorRes, successRes } = require("../response");
const Piatto = require('../db/piatto').Piatto;
const GestoreMenu = require("../gestori/GestoreMenu");


// Ritorna tutti i piatti del menu
router.get('/', async function (req, res, next) {

  categorie = await Piatto.find().distinct('categoria').catch((err) => {
    errorRes(res, err, "Errore nel recupero del menu", 424);
  });
  piatti = await GestoreMenu.getMenu().catch((err) => {
    errorRes(res, err, "Errore nel recupero del menu", 424);
  });

  data = {
    categorie: categorie,
    piatti: piatti
  }
  successRes(res, "OK", data);
});

// Aggiunge un piatto al menu
router.post('/', async function (req, res, next) {

  GestoreMenu.aggiungiPiatto(
    req.body.nome,
    req.body.prezzo,
    req.body.categoria,
    req.body.disponibile,
    req.body.descrizione,
    req.body.allergeni,
    req.body.ingredientiModificabili,
    res
  );
});

// Modifica un piatto identidificato da idPiatto
router.put('/:idPiatto', async function (req, res, next) {

  GestoreMenu.modificaPiatto(
    req.params.idPiatto,
    req.body.nome,
    req.body.prezzo,
    req.body.categoria,
    req.body.disponibile,
    req.body.descrizione,
    req.body.allergeni,
    req.body.ingredientiModificabili,
    res
  );
});

// Elimina un piatto identificato da idPiatto
router.delete('/:idPiatto', async function (req, res, next) {

  GestoreMenu.rimuoviPiatto(req.params.idPiatto, res);
});


module.exports = router;

