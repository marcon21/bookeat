var express = require("express");
var router = express.Router();
const { errorRes, successRes } = require("../response");

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user
  });
});

module.exports = router;
