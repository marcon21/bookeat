const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User schema
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["utenteLoggato", "tavolo", "cucina", "sala", "manager"],
  },
});

// Hashing password before saving it to the database
UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

// Validating password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

var User = mongoose.model("User", UserSchema);

module.exports = {
  User: User,
};
