const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User schema
var SchemaUtente = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  nome: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: [
      "UtenteAbstract",
      "UtenteAnonimo",
      "Utente",
      "Dipendente",
      "Tavolo",
      "UtenteLoggato",
      "Cucina",
      "Sala",
      "Manager",
    ],
  },
  googleId: {
    type: String,
    default: "",
  },
});

// Hashing password before saving it to the database
SchemaUtente.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

// // Hashing password before saving it to the database
// SchemaUtente.pre("findOneAndUpdate", async function () {
//   const user = await this.model.findOne(this.getQuery());
//   const hash = await bcrypt.hash(user.password, 10);

//   console.log("User: " + user);

//   this.set({ password: hash });
// });

// Function for hashing password
SchemaUtente.methods.hashPassword = async function (password) { return await bcrypt.hash(password, 10); };

// Validating password
SchemaUtente.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

var User = mongoose.model("User", SchemaUtente);

module.exports = {
  User: User,
};
