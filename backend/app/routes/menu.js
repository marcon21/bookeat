/**
 * Definizione delle route per il menu
 */

// Import Classi Utenti
const Cucina = require("../utenti/Cucina");
const Dipendente = require("../utenti/Dipendente");
const Manager = require("../utenti/Manager");
const Sala = require("../utenti/Sala");
const Tavolo = require("../utenti/Tavolo");
const UtenteLoggato = require("../utenti/UtenteLoggato");
const UtenteAbstract = require("../utenti/UtenteAbstract");
const ClasseUtente = require("../utils/ClasseUtente");

var express = require('express');
var router = express.Router();
const { errorRes, successRes } = require("../response");
const Piatto = require('../db/piatto').Piatto;
const User = require('../db/utente').User;
const GestoreMenu = require("../gestori/GestoreMenu");
const passport = require("passport");


// Ritorna tutti i piatti del menu
router.get('/', async function (req, res, next) {

  categorie = await Piatto.find().distinct('categoria').catch((err) => {
    errorRes(res, err, "Errore nel recupero del menu", 424);
  });
  piatti = await GestoreMenu.getMenu().catch((err) => {
    errorRes(res, err, "Errore nel recupero del menu", 424);
  });

  data = {
    categorie: categorie,
    piatti: piatti
  }
  successRes(res, "OK", data);
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

