const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");

const passport = require("passport");
const jwt = require("jsonwebtoken");

const { ServerResponse } = require("http");

// Setting up route for registering a new user
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    successRes(res, "Signup successful", { user: req.user });
  }
);

// Setting up route for logging in a user
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return successRes(res, "Login successful", { token: token });
      });
    } catch (error) {
      return next(error);
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
      console.log(err, user, info);
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
