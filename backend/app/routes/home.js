var express = require('express');
var router = express.Router();
const { errorRes, successRes } = require('../response');

/* GET home page. */
router.get('/', function(req, res, next) {
  successRes(res, 'It workswww', {"aaa": "asdsa"});
});

module.exports = router;
