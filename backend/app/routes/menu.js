var express = require('express');
var router = express.Router();
const { errorRes, successRes } = require('../response');
const { db } = require('../db');
const Plate = require('../db/plate').Plate;

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Creates a random menu entry.
 */
router.post('/createrandom', async function(req, res, next) {
  const pp = new Plate({ name: Math.random().toString(36).substring(2,7), price: Math.floor(Math.random() * 1000) });
  await pp.save();

  successRes(res, 'Created a random entry in the menu', pp);
});

router.get('/get/all', async function(req, res, next) {
  const plates = await Plate.find();
  successRes(res, 'All plates in the menu', plates);
});

router.delete('/delete/all', async function(req, res, next) {
  await Plate.deleteMany({});
  successRes(res, 'Deleted all entries in the menu collection');
});


module.exports = router;
