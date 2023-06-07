const mongoose = require('mongoose');
const Piatto = require('../db/piatto').Piatto;
const User = require('../db/utente').User;

const data = require('./piatti.json');
const utenti = require('./utenti.json');

const options = { maxTimeMS: 30000 };

async function deleteMenu() {
    await Piatto.deleteMany({}, options);
}

async function deleteUtenti() {
    await User.deleteMany({}, options);
}

async function deleteDatabase() {
    await deleteMenu();
    await deleteUtenti();
}

async function populateMenu() {
    await Piatto.create(data);
}

async function populateUtenti() {
    await User.create(utenti);
}

async function populate() {
    mongoose.connect("mongodb://user:1234@mongo:27017/restaurant");

    await populateMenu();
    await populateUtenti();

    mongoose.connection.close();
}

async function manualPopulate() {
    mongoose.connect("mongodb://user:1234@mongo:27017/restaurant");
    await deleteDatabase()
        .then(() => console.log("Database cancellato"))
        .catch((err) => console.log(err));
    await populate()
        .then(() => console.log("Database popolato"))
        .catch((err) => console.log(err));
        mongoose.connection.close();
    }

if (require.main === module) {
    manualPopulate();
}

exports.populate = populate;
exports.deleteDatabase = deleteDatabase;
exports.populateMenu = populateMenu;
exports.populateUtenti = populateUtenti;
exports.deleteMenu = deleteMenu;
exports.deleteUtenti = deleteUtenti;