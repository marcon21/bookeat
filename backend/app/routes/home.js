const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");

/* GET home page. */
router.get("/", function (req, res, next) {
  successRes(res, "Nothing to see here", {});
});

module.exports = router;
