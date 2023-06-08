const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { checkSchema, validationResult } = require("express-validator");

const userSchemaSignUP = require("../validation").userSchemaSignUP;
const userSchemaLogin = require("../validation").userSchemaLogin;

const { ServerResponse } = require("http");
const UtenteAnonimo = require("../utenti/UtenteAnonimo");

router.post(
  "/signup",
  checkSchema(userSchemaSignUP),
  function (req, res, next) {
    let val = validationResult(req);
    if (!val.isEmpty()) {
      return errorRes(res, val, "Signup failed, incomplete values", 401);
    }
    try {
      passport.authenticate("signup", function (err, user, info) {
        if (err || !user) {
          return errorRes(res, err, "Signup failed ERORR", 401);
          // return errorRes(res, err, JSON.stringify(user), 401);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return errorRes(res, error, "Signup failed", 401);

          const token = await UtenteAnonimo.generaJWT(user._id, user.email);

          return successRes(
            res,
            "Signup successful",
            {
              token: token,
              userType: user.userType,
            },
            200
          );
        });
      })(req, res, next);
    } catch (err) {
      return errorRes(res, err, "Signup failed", 401);
    }
  }
);

// Setting up route for logging in a user
router.post("/login", checkSchema(userSchemaLogin), async (req, res, next) => {
  let val = validationResult(req);
  if (!val.isEmpty()) {
    console.log(val);
    return errorRes(res, val, "Login failed", 401);
  }
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        // const error = new Error("An error occurred.");
        return errorRes(res, err, "Login failed", 401);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return errorRes(res, error, "Login failed", 401);

        const token = await UtenteAnonimo.generaJWT(user._id, user.email);

        return successRes(res, "Login successful", {
          token: token,
          userType: user.userType,
        });
      });
    } catch (error) {
      return errorRes(res, error, "Login failed", 401);
    }
  })(req, res, next);
});

// Setting up route for recieving google OAuth link
router.get("/google", (request, response) => {
  const emptyResponse = new ServerResponse(request);

  passport.authenticate(
    "google",
    { scope: ["profile", "email"], session: false },
    (err, user, info) => {
      // console.log(err, user, info);
    }
  )(request, emptyResponse);

  successRes(response, "Google auth link", {
    url: emptyResponse.getHeader("location"),
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/menu/all",
  }),
  function (req, res) {
    res.cookie("jwt", req.user.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:3001/api/v1/utente/profile");
  }
);

module.exports = router;
