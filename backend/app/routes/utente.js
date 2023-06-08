const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");
const GestoreProfilo = require("../gestori/GestoreProfilo");

const { db } = require("../db");
const User = require("../db/utente").User;
const ClasseUtente = require("../utils/ClasseUtente");
const Manager = require("../utenti/Manager");

const { checkSchema, validationResult } = require("express-validator");
const userSchemaSignUP = require("../validation").userSchemaSignUP;
const userSchemaLogin = require("../validation").userSchemaLogin;
const passwordSchema = require("../validation").passwordSchema;
const emailSchema = require("../validation").emailSchema;
const nomeSchema = require("../validation").nomeSchema;
const userTypeSchema = require("../validation").userTypeSchema;
const changePasswordSchema = require("../validation").changePasswordSchema;

// Route for getting user profile, only accessible if logged in
router.get("/profilo", async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });

  if (user == null) {
    errorRes(res, null, "Utente non trovato", 404);
  }
  successRes(res, "User profile", { user: user });
});

// Route for getting user profile, only accessible if logged in
router.post(
  "/profilo",
  checkSchema(userSchemaSignUP),
  async (req, res, next) => {
    const val = validationResult(req);
    if (!val.isEmpty()) {
      return errorRes(res, null, "Fields required", 424);
    }

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

      return successRes(res, "User profile", { user: response });
    } catch (error) {
      return errorRes(res, error, error.message, error.code);
    }
  }
);

// Route for deleting user profile, only accessible if logged in
router.delete("/profilo/:id?", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (
      user.userType == "Manager" &&
      req.params.id != null &&
      req.params.id != req.user._id
    ) {
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
router.put(
  "/password/:id?",
  checkSchema(changePasswordSchema),
  async (req, res, next) => {
    const val = validationResult(req);
    if (!val.isEmpty()) {
      return errorRes(res, null, "Fields required", 400);
    }

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
  }
);

//Route for changing name
router.put("/nome/:id?", checkSchema(nomeSchema), async (req, res, next) => {
  const val = validationResult(req);
  if (!val.isEmpty()) {
    return errorRes(res, null, "Fields required", 400);
  }

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

    return successRes(res, "Nome cambiato con successo", { user: response });
  } catch (error) {
    return errorRes(res, error, "Impossibile cambiare il nome");
  }
});

module.exports = router;
