const passport = require("passport");
require("../auth/passport-auth");

const home = require("./home");
const menu = require("./menu");
const user = require("./utente");
const auth = require("./auth");

const base_url = "/api/v1";
passport_options = {
  session: false,
  failureRedirect: base_url + "/auth/login",
};

// Exporting routes
module.exports = (app) => {
  app.use(base_url, home);
  app.use(base_url + "/auth", auth);
  app.use(base_url + "/menu", menu);
  app.use(
    base_url + "/utente",
    passport.authenticate("jwt", passport_options),
    user
  );
};
