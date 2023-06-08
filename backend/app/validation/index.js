userSchemaSignUP = {
  email: {
    isEmail: true,
    notEmpty: true,
    errorMessage: "Email is not valid",
  },
  password: {
    errorMessage:
      "The password must be at least 8 characters, and must contain a symbol",
    isLength: { options: { min: 8 } },
    matches: { options: /[!@#$%^&*]/ },
  },
  nome: {
    notEmpty: true,
    errorMessage: "Nome is not valid",
  },
};

userSchemaLogin = {
  email: {
    isEmail: true,
    notEmpty: true,
    errorMessage: "Email is not valid",
  },
  password: {
    errorMessage:
      "The password must be at least 8 characters, and must contain a symbol",
    isLength: { options: { min: 8 } },
    matches: { options: /[-_$#!]/ },
  },
};

module.exports = {
  userSchemaSignUP,
  userSchemaLogin,
};
