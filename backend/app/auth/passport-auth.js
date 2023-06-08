const { db } = require("../db");
const User = require("../db/utente").User;
const GestoreProfilo = require("../gestori/GestoreProfilo");
const UtenteAnonimo = require("../utenti/UtenteAnonimo");
const UtenteLoggato = require("../utenti/UtenteLoggato");

const { errorRes, successRes } = require("../response");

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { checkSchema, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

// Setting up strategy for passport for registering a new user
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await UtenteAnonimo.creaAccount(
          req.body.nome,
          "UtenteLoggato",
          email,
          password,
          ""
        );

        return done(null, user);
      } catch (error) {
        // console.log(error);
        return done(null, false);
      }
    }
  )
);

// Setting up strategy for passport for logging in an user
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

// Setting up strategy for passport for jwt
passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      jwtFromRequest: cookieExtractor,
    },
    async (token, done) => {
      try {
        const user = await User.findById(token.user._id);

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      // Google OAuth 2.0 credentials, they will be changed in production
      clientID:
        "596841181986-4mbjpaop1352i033dr72odthmkulvbr0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3001/api/v1/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const email = profile["emails"][0]["value"];

      const user = await UtenteLoggato.linkGoogleAccount(email, profile.id);
      const token = await UtenteAnonimo.generaJWT(user._id, user.email);

      return cb(null, { token: token, user: user });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
