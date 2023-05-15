const passport = require("passport");
require("../auth/auth");

const home = require("./home");
const menu = require("./menu");
const user = require("./user");
const signup = require("./signup");

// Exporting routes
module.exports = (app) => {
  app.use("/api/v1/", home);
  app.use("/api/v1/", signup);
  app.use("/api/v1/menu", menu);
  app.use(
    "/api/v1/user",
    passport.authenticate("jwt", { session: false }),
    user
  );
};
