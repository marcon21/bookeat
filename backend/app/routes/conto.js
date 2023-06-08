/**
 * Definizione delle route per il conto
 */

var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../db/utente").User;
const ClasseUtente = require("../utils/ClasseUtente");
const { errorRes, successRes } = require("../response");
const NotFoundException = require("../exceptions/NotFoundException");
const BadRequestException = require("../exceptions/BadRequestException");

/**
 * Apre un conto
 * Disponibile solo per il tavolo
*/
router.post(
  "/apriConto",
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      idConto = await ClasseUtente.getClasseUtente(user.userType).apriConto(
        req.user._id,
        req.body.nCoperti
      );
      successRes(res, "OK", idConto);
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

/** 
 * Chiude un conto
 */
router.put(
  "/chiudiConto/:idConto?",
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      await ClasseUtente.getClasseUtente(user.userType).chiudiConto(req.params.idConto);
      successRes(res, "OK", {});
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

/** 
 * Invia un conto
 * Disponibile solo per il tavolo
 */
router.put(
  "/inviaConto",
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      await ClasseUtente.getClasseUtente(user.userType).inviaConto(req.user._id);
      successRes(res, "OK", {});
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

/**
 * Invia un ordine
 *
 */
router.post(
  "/invioOrdine",
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      await ClasseUtente.getClasseUtente(user.userType).invioOrdine(
        req.user._id,
        req.body.portate
      );

      successRes(res, "OK", {});
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

module.exports = router;
