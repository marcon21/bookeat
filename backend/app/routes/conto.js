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

/**
 * Apre un conto
 * 
 * @returns idConto - L'id del conto aperto
 */
router.post("/apriConto",
    passport.authenticate("jwt", {
        session: false
    }),
    async function (req, res, next) {
        const user = await User.findOne({ _id: req.user._id });

        try {
            idConto = await ClasseUtente.getClasseUtente(user.userType).apriConto(req.user._id, req.body.nCoperti);
            successRes(res, "OK", idConto);
        } catch (error) {
            errorRes(res, error, error.message, error.code);
        }

    }
);



/**
 * Invia un ordine 
 * 
 */
router.post("/invioOrdine",
    passport.authenticate("jwt", {
        session: false
    }),
    async function (req, res, next) {
        const user = await User.findOne({ _id: req.user._id });

        await ClasseUtente.getClasseUtente(user.userType).invioOrdine(req.user._id, req.body.portate).then((idConto) => {
            successRes(res, "OK", { "idConto": idConto });
        }).catch((error) => {
            errorRes(res, error, error.message, error.code);
        });
    }
);

module.exports = router;