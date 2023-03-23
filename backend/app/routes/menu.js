var express = require('express');
var router = express.Router();
const { errorRes, successRes } = require('../response');
const { db } = require('../db');
const Plate = require('../db/plate').Plate;


router.post('/create', async function(req, res, next) {
  const pp = new Plate({ name: 'Spaghetti', price: 8 });
  await pp.save();

  successRes(res, 'It works', {"aaa": "bbb"});
});


module.exports = router;
