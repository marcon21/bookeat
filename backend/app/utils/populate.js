const mongoose = require('mongoose');
const Piatto = require('../db/piatto').Piatto;
const User = require('../db/utente').User;

const data = require('./piatti.json');
const utenti = require('./utenti.json');

// Funzione per il popolamento del database
async function populateDatabase() {
    mongoose.connect("mongodb://user:1234@mongo:27017/restaurant");

    await Piatto.deleteMany({}).then(() => {
        console.log("Menu Eliminato");
    }).catch((err) => {
        console.log(err);
    });

    await Piatto.create(data).then((piatto) => {
        console.log("Menu Caricato");
    }).catch((err) => {
        console.log(err);
    });

    await User.deleteMany({}).then(() => {
        console.log("Utenti Eliminati");
    }).catch((err) => {
        console.log(err);
    });

    await User.create(utenti).then((User) => {
        console.log("Utenti Caricati");
    }).catch((err) => {
        console.log(err);
    });

    mongoose.connection.close();
}

// Esecuzione della funzione di popolamento
populateDatabase();