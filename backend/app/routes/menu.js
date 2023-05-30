/**
 * Definizione delle route per il menu
 */

var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../db/utente").User;
const ClasseUtente = require("../utils/ClasseUtente");
const UtenteAnonimo = require("../utenti/UtenteAnonimo");
const { errorRes, successRes } = require("../response");

/**
 * Ritorna tutti i piatti del menu
 */
router.get("/", async function (req, res, next) {

  try {
    data = await UtenteAnonimo.getMenu();
    successRes(res, data);
  } catch (error) {
    errorRes(res, error, error.message, error.code);
  }

});

/**
 * Aggiunge un piatto al menu
 */
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/v1/auth/login",
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      await ClasseUtente.getClasseUtente(user.userType).aggiungiPiatto(
        req.body.nome,
        req.body.prezzo,
        req.body.categoria,
        req.body.disponibile,
        req.body.descrizione,
        req.body.allergeni,
        req.body.ingredientiModificabili
      );

      successRes(res, "Piatto aggiunto con successo");
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }

  }
);

/**
 * Modifica un piatto identificato da idPiatto
 */
router.put(
  "/:idPiatto",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/v1/auth/login",
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      await ClasseUtente.getClasseUtente(user.userType).modificaPiatto(
        req.params.idPiatto,
        req.body.nome,
        req.body.prezzo,
        req.body.categoria,
        req.body.disponibile,
        req.body.descrizione,
        req.body.allergeni,
        req.body.ingredientiModificabili
      );

      successRes(res, "Piatto modificato con successo");
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

/**
 * Elimina un piatto identificato da idPiatto
 */
router.delete(
  "/:idPiatto",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/v1/auth/login",
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      await ClasseUtente.getClasseUtente(user.userType).rimuoviPiatto(req.params.idPiatto);

      successRes(res, "Piatto eliminato con successo");
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

module.exports = router;
