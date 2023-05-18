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
  userType: {
    type: String,
    required: true,
    enum: ["utenteLoggato", "tavolo", "cucina", "sala", "manager"],
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
