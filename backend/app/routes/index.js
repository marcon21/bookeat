const home = require('./home');
const menu = require('./menu');

module.exports = (app) => {
    app.use('/api/', home);
    app.use('/api/menu', menu);
};