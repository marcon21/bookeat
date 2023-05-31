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

//Route for change password
router.post("/profile/changepassword", async (req, res, next) => {
  // Ottieni l'ID dell'utente loggato
  const userId = req.user._id; 
  // Ottieni vecchia e nuova password dalla richiesta
  const { oldPassword, newPassword } = req.body; 

  try {
    // Chiamare il metodo per cambiare la password nel GestoreProfilo
    await GestoreProfilo.modificaPassword(userId, oldPassword, newPassword);

    successRes(res, "Password cambiata con successo");
  } catch (error) {
    errorRes(res, "Impossibile cambiare la password", error);
  }
});

//Route for change name
router.post("/profile/changename", async (req, res, next) => {
  // Ottieni l'ID dell'utente loggato
  const userId = req.user._id; 
  // Ottieni nuovo nome dalla richiesta
  const { Name } = req.body; 

  try {
    // Chiamare il metodo per cambiare la password nel GestoreProfilo
    await GestoreProfilo.modificaNome(userId, Name);

    successRes(res, "Nome cambiato con successo");
  } catch (error) {
    errorRes(res, "Impossibile cambiare il nome", error);
  }
});

module.exports = router;
