const Piatto = require("../db/piatto").Piatto;
const User = require("../db/utente").User;
const { db } = require("../db");
const data = require("./piatti.json");
const utenti = require("./utenti.json");

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
  await populateMenu();
  await populateUtenti();
}

async function manualPopulate() {
  await deleteDatabase()
    .then(() => console.log("Database cancellato"))
    .catch((err) => console.log(err));
  await populate()
    .then(() => console.log("Database popolato"))
    .catch((err) => console.log(err));
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
