/**
 * Definizione delle route per il conto
 */

var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../db/utente").User;
const ClasseUtente = require("../utils/ClasseUtente");
const { errorRes, successRes } = require("../response");
const InvalidUserException = require("../exceptions/InvalidUserException");

router.post("/apriConto",
    passport.authenticate("jwt", {
        session: false,
        failureRedirect: "/api/v1/auth/login",
    }),
    async function (req, res, next) {
        const user = await User.findOne({ _id: req.user._id }).catch((err) => {
            log.error(err);
            errorRes(res, new InvalidUserException("Invalid User"), err.message, err.code);
        });
        console.log(user.userType);

        try {
            idConto = await ClasseUtente.getClasseUtente(user.userType).apriConto(req.user._id, req.body.nCoperti);
            successRes(res, "OK", idConto);
        } catch (error) {
            errorRes(res, error, error.message, error.code);
        }

    }
);

router.post("/invioOrdine",
    passport.authenticate("jwt", {
        session: false,
        failureRedirect: "/api/v1/auth/login",
    }),
    async function (req, res, next) {
        const user = await User.findOne({ _id: req.user._id });

    }
);

module.exports = router;