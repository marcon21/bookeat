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

  successRes(res, "User profile", { user: user });
});

// Route for getting user profile, only accessible if logged in
router.put("/profilo", async (req, res, next) => {
  const user = await ClasseUtente.getClasseUtente(
    req.user.userType
  ).creaAccount(
    req.body.nome,
    req.body.tipo,
    req.body.email,
    req.body.password,
    ""
  );
  successRes(res, "User profile", { user: user });
});

//Route for changing password
router.put("/password/:id?", async (req, res, next) => {
  // Ottieni l'ID dell'utente loggato
  const userId = req.user._id;
  // Ottieni vecchia e nuova password dalla richiesta
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ _id: req.user._id });

    let id =
      req.params.id != null && user.userType == "Manager"
        ? req.params.id
        : req.user._id;

    await ClasseUtente.getClasseUtente(user.userType).modificaPassword(
      id,
      oldPassword,
      newPassword
    );

    user = await User.findOne({ _id: id });

    successRes(res, "Password cambiata con successo", { user: user });
  } catch (error) {
    errorRes(res, "Impossibile cambiare la password", error);
  }
});

//Route for changing name
router.put("/nome/:id?", async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.user._id });

    let id =
      req.params.id != null && user.userType == "Manager"
        ? req.params.id
        : req.user._id;

    await ClasseUtente.getClasseUtente(user.userType).modificaNome(
      id,
      req.body.nome
    );

    user = await User.findOne({ _id: id });

    successRes(res, "Nome cambiato con successo", { user: user });
  } catch (error) {
    errorRes(res, error, "Impossibile cambiare il nome");
  }
});

module.exports = router;
