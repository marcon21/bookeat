const mongoose = require('mongoose');

// await mongoose.connect(
//     "mongodb://user:1234@mongo:27017/restaurant",
// )
//     .then(() => console.log('connected'))
//     .catch(e => console.log(e));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://user:1234@mongo:27017/restaurant")

module.export = { mongoose };