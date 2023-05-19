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

  categorie = await Piatto.find().distinct('categoria')
  piatti = await GestoreMenu.getMenu()

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
  // TODO
});

// Elimina un piatto identificato da idPiatto
router.delete('/:idPiatto', async function (req, res, next) {
  // TODO
});

module.exports = router;

/*
router.post('/createrandom', async function (req, res, next) {
  const pp = new Plate({ name: Math.random().toString(36).substring(2, 7), price: Math.floor(Math.random() * 1000) });
  await pp.save();

  successRes(res, "Created a random entry in the menu", pp);
});

router.get('/all', async function (req, res, next) {
  const plates = await Plate.find();
  successRes(res, "All plates in the menu", plates);
});

router.delete('/all', async function (req, res, next) {
  await Plate.deleteMany({});
  successRes(res, "Deleted all entries in the menu collection");
});
*/
