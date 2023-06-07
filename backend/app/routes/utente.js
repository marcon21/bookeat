const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");
const GestoreProfilo = require("../gestori/GestoreProfilo");

const { db } = require("../db");
const User = require("../db/utente").User;
const ClasseUtente = require("../utils/ClasseUtente");
const Manager = require("../utenti/Manager");

// Route for getting user profile, only accessible if logged in
router.get("/profilo", async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });

  if (user == null) {
    errorRes(res, null, "Utente non trovato", 404);
  }
  successRes(res, "User profile", { user: user });
});

// Route for getting user profile, only accessible if logged in
router.post("/profilo", async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  try {
    const response = await ClasseUtente.getClasseUtente(
      user.userType
    ).creaAccount(
      req.body.nome,
      req.body.userType,
      req.body.email,
      req.body.password,
      ""
    );

    successRes(res, "User profile", { user: response });
  } catch (error) {
    errorRes(res, error, error.message, error.code);
  }
});

// Route for deleting user profile, only accessible if logged in
router.delete("/profilo/:id?", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user.userType == "Manager" && req.params.id != null && req.params.id != req.user._id) {
      await ClasseUtente.getClasseUtente(user.userType).eliminaAccount(
        req.params.id,
        req.body.password
      );
    } else {
      await ClasseUtente.getClasseUtente(user.userType).eliminaAccount(
        req.user._id,
        req.body.password
      );
    }

    successRes(res, "Accunt utente eliminato correttamente");
  } catch (error) {
    errorRes(res, error, error.message, error.code);
  }
});


//Route for changing password
router.put("/password/:id?", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    let id =
      req.params.id != null && user.userType == "Manager"
        ? req.params.id
        : req.user._id;

    await ClasseUtente.getClasseUtente(user.userType).modificaPassword(
      id,
      req.body.vecchiaPassword,
      req.body.nuovaPassword
    );

    const response = await User.findOne({ _id: id });

    successRes(res, "Password cambiata con successo", { user: response });
  } catch (error) {
    errorRes(res, error, error.message, error.code);
  }
});

//Route for changing name
router.put("/nome/:id?", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    let id =
      req.params.id != null && user.userType == "Manager"
        ? req.params.id
        : req.user._id;

    await ClasseUtente.getClasseUtente(user.userType).modificaNome(
      id,
      req.body.nome
    );

    const response = await User.findOne({ _id: id });

    successRes(res, "Nome cambiato con successo", { user: response });
  } catch (error) {
    errorRes(res, error, "Impossibile cambiare il nome");
  }
});

module.exports = router;
