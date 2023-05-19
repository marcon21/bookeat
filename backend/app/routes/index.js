const passport = require("passport");
require('../auth/auth');


const home = require('./home');
const menu = require('./menu');
const secureRoute = require('./secure-routes');
const signup = require('./signup');

module.exports = (app) => {
    app.use('/api/v1/', home);
    app.use('/api/v1/menu', passport.authenticate('jwt', { session: false }), menu);
    app.use('/', signup);
    app.use('/api/v1/user', passport.authenticate('jwt', { session: false }), secureRoute);
};