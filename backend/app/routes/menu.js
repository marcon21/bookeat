/**
 * Definizione delle route per il menu
 */

var express = require('express');
var router = express.Router();
const passport = require("passport");
const User = require('../db/utente').User;
const Piatto = require('../db/piatto').Piatto;
const { errorRes, successRes } = require("../response");
const ClasseUtente = require("../utils/ClasseUtente");
const UtenteAnonimo = require("../utenti/UtenteAnonimo");


// Ritorna tutti i piatti del menu
router.get('/', async function (req, res, next) {
  UtenteAnonimo.getMenu(res);
});

// Aggiunge un piatto al menu
router.post(
  '/',
  passport.authenticate(
    "jwt", {
    session: false,
    failureRedirect: "/api/v1/auth/login",
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    ClasseUtente.getClasseUtente(user.userType).aggiungiPiatto(
      req.body.nome,
      req.body.prezzo,
      req.body.categoria,
      req.body.disponibile,
      req.body.descrizione,
      req.body.allergeni,
      req.body.ingredientiModificabili,
      res
    );
  });

// Modifica un piatto identidificato da idPiatto
router.put(
  '/:idPiatto',
  passport.authenticate(
    "jwt", {
    session: false,
    failureRedirect: "/api/v1/auth/login",
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    ClasseUtente.getClasseUtente(user.userType).modificaPiatto(
      req.params.idPiatto,
      req.body.nome,
      req.body.prezzo,
      req.body.categoria,
      req.body.disponibile,
      req.body.descrizione,
      req.body.allergeni,
      req.body.ingredientiModificabili,
      res
    );
  });

// Elimina un piatto identificato da idPiatto
router.delete(
  '/:idPiatto',
  passport.authenticate(
    "jwt", {
    session: false,
    failureRedirect: "/api/v1/auth/login",
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    ClasseUtente.getClasseUtente(user.userType).rimuoviPiatto(req.params.idPiatto, res);
  });


module.exports = router;

