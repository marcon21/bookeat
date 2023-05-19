/**
 * Definizione delle route per il menu
 */
var express = require('express');
var router = express.Router();
const { errorRes, successRes } = require("../response");

router.get('/', async function (req, res, next) {
  data = {
    categorie: [
      { 'id': 1, nome: "Pizze" },
      { id: 2, nome: "Antipasti" }
    ],
    piatti: [
      {
        'id': 1,
        nome: "Pizza Margherita",
        prezzo: "5.00",
        disponibile: 1,
        descrizione: "Pizza con mozzarella e pomodoro",
        allergeni: ["Glutine", "Lattosio"],
        ingredientiModificabili: ["Mozzarella", "Salamino", "Funghi"]
      }
    ]
  }
  successRes(res, 'OK', data);
});

router.post('/', async function (req, res, next) {
  // TODO
});

router.put('/:id', async function (req, res, next) {
  // TODO
});

router.delete('/:id', async function (req, res, next) {
  // TODO
});

module.exports = router;

/*
router.post('/createrandom', async function (req, res, next) {
  const pp = new Plate({ name: Math.random().toString(36).substring(2, 7), price: Math.floor(Math.random() * 1000) });
  await pp.save();

  successRes(res, 'Created a random entry in the menu', pp);
});

router.get('/all', async function (req, res, next) {
  const plates = await Plate.find();
  successRes(res, 'All plates in the menu', plates);
});

router.delete('/all', async function (req, res, next) {
  await Plate.deleteMany({});
  successRes(res, 'Deleted all entries in the menu collection');
});
*/