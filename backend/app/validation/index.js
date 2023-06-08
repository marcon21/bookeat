emailSchema = {
  email: {
    isEmail: true,
    notEmpty: true,
    errorMessage: "Email is not valid",
  },
};

passwordSchema = {
  password: {
    errorMessage:
      "The password must be at least 8 characters, and must contain a symbol",
    isLength: { options: { min: 8 } },
    matches: { options: /[!@#$%^&*]/ },
  },
};

nomeSchema = {
  nome: {
    notEmpty: true,
    errorMessage: "Nome is not valid",
    isLength: { options: { max: 100 } },
  },
};

userTypeSchema = {
  userType: {
    optional: true,
    isIn: {
      options: [
        [
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
      ],
    },
  },
};

userSchemaSignUP = {
  email: emailSchema.email,
  password: passwordSchema.password,
  nome: nomeSchema.nome,
  userType: userTypeSchema.userType,
};

userSchemaLogin = {
  email: emailSchema.email,
  password: passwordSchema.password,
};

changePasswordSchema = {
  vecchiaPassword: passwordSchema.password,
  nuovaPassword: passwordSchema.password,
};

module.exports = {
  userSchemaSignUP,
  userSchemaLogin,
  passwordSchema,
  emailSchema,
  nomeSchema,
  userTypeSchema,
  changePasswordSchema,
};
