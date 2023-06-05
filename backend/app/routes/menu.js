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
 * 
 * @returns menu - Il menu del ristorante
 */
router.get("/", async function (req, res, next) {

  try {
    data = await UtenteAnonimo.getMenu();
    successRes(res, "OK", data);
  } catch (error) {
    errorRes(res, error, error.message, error.code);
  }

});

/**
 * Aggiunge un piatto al menu
 * 
 * @requires body.nome - Il nome del piatto
 * @requires body.prezzo - Il prezzo del piatto
 * @requires body.categoria - La categoria del piatto
 * @requires body.disponibile - Indica se il piatto è disponibile
 * @requires body.descrizione - La descrizione del piatto
 * @requires body.allergeni - Gli allergeni del piatto
 * @requires body.ingredientiModificabili - Gli ingredienti modificabili del piatto
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

      successRes(res, "OK");
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

      successRes(res, "OK");
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

      successRes(res, "OK");
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

module.exports = router;
