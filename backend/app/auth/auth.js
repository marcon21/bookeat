const { db } = require("../db");
const User = require("../db/utente").User;

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const jwt = require("jsonwebtoken");

// Setting up strategy for passport for registering a new user
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({
          email: email,
          password: password,
          userType: "UtenteLoggato",
        });

        return done(null, user);
      } catch (error) {
        done(error);
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
  if (req && req.cookies) token = req.cookies["jwt"];
  console.log("cookieExtractor");
  console.log(token);
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
      clientID:
        "596841181986-4mbjpaop1352i033dr72odthmkulvbr0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3001/api/v1/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // console.log(profile["emails"][0]["value"]);

      const email = profile["emails"][0]["value"];
      let user = await User.findOne({ email: email });

      if (!user) {
        user = await User.create({
          email: email,
          password: "TOP_SECRET",
          userType: "utenteLoggato",
          googleId: profile.id,
        });
      }

      if (user.googleId != profile.id) {
        let _user = await User.findOneAndUpdate(
          { email: email },
          { googleId: profile.id }
        );
        user = await User.findOne({ email: email });
      }

      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, "TOP_SECRET");

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
