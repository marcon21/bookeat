const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");
const GestoreProfilo = require("../gestori/GestoreProfilo");

const { db } = require("../db");
const User = require("../db/utente").User;

// Route for getting user profile, only accessible if logged in
router.get("/profile", async (req, res, next) => {
  const user = await GestoreProfilo.getUtente(req.user._id);

  successRes(res, "User profile", { user: user });
});

module.exports = router;
