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

const { checkSchema, validationResult, check } = require("express-validator");
const userSchemaSignUP = require("../validation").userSchemaSignUP;
const userSchemaLogin = require("../validation").userSchemaLogin;
const passwordSchema = require("../validation").passwordSchema;
const emailSchema = require("../validation").emailSchema;
const nomeSchema = require("../validation").nomeSchema;
const userTypeSchema = require("../validation").userTypeSchema;
const changePasswordSchema = require("../validation").changePasswordSchema;
const ordineSchema = require("../validation").ordineSchema;
const contoSchema = require("../validation").contoSchema;

/**
 * Apre un conto
 * Disponibile solo per il tavolo
*/
router.post(
  "/apriConto",
  checkSchema(contoSchema),
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const val = validationResult(req);
    if (!val.isEmpty()) {
      return errorRes(res, null, "Fields required", 424);
    }

    const user = await User.findOne({ _id: req.user._id });

    try {
      idConto = await ClasseUtente.getClasseUtente(user.userType).apriConto(
        req.user._id,
        req.body.nCoperti
      );
      successRes(res, "OK", idConto, 201);
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
  checkSchema(ordineSchema),
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const val = validationResult(req);
    if (!val.isEmpty()) {
      return errorRes(res, null, "Fields required", 424);
    }

    const user = await User.findOne({ _id: req.user._id });

    try {
      await ClasseUtente.getClasseUtente(user.userType).invioOrdine(
        req.user._id,
        req.body.portate
      );

      return successRes(res, "OK", {}, 201);
    } catch (error) {
      return errorRes(res, error, error.message, error.code);
    }
  }
);

module.exports = router;
