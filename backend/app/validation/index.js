const emailSchema = {
  email: {
    isEmail: true,
    notEmpty: true,
    errorMessage: "Email is not valid",
  },
};

const passwordSchema = {
  password: {
    errorMessage:
      "The password must be at least 8 characters, and must contain a symbol",
    isLength: { options: { min: 8 } },
    matches: { options: /[!@#$%^&*]/ },
  },
};

const nomeSchema = {
  nome: {
    notEmpty: true,
    errorMessage: "Nome is not valid",
    isLength: { options: { max: 100 } },
  },
};

const userTypeSchema = {
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

const userSchemaSignUP = {
  email: emailSchema.email,
  password: passwordSchema.password,
  nome: nomeSchema.nome,
  userType: userTypeSchema.userType,
};

const userSchemaLogin = {
  email: emailSchema.email,
  password: passwordSchema.password,
};

const changePasswordSchema = {
  vecchiaPassword: passwordSchema.password,
  nuovaPassword: passwordSchema.password,
};

const ordineSchema = {
  portate: {
    notEmpty: true,
    optional: false,
    errorMessage: "Portate is not valid",
    isArray: true,
    custom: {
      options: (value) => {
        if (value.length > 0) {
          return value.every((element) => {
            return (
              element.idPiatto != null &&
              element.priorita != null &&
              element.ingredientiScelti != null
            );
          });
        }
        return false;
      },
    },
  },
  "portate.*.idPiatto": {
    notEmpty: true,
    required: true,
    errorMessage: "idPiatto is not valid",
    isMongoId: true,
  },
  "portate.*.note": {
    optional: true,
  },
  "portate.*.note.*": {
    isString: true,
  },
  "portate.*.priorita": {
    notEmpty: true,
    isInt: true,
    required: true,
    errorMessage: "Priorita is not valid",
  },
  "portate.*.ingredientiScelti": {
    isArray: true,
    notEmpty: false,
    errorMessage: "IngredientiScelti is not valid",
  },
};

const contoSchema = {
  nCoperti: {
    notEmpty: true,
    isInt: true,
    required: true,
    errorMessage: "nCoperti is not valid",
  },
};

module.exports = {
  userSchemaSignUP,
  userSchemaLogin,
  passwordSchema,
  emailSchema,
  nomeSchema,
  userTypeSchema,
  changePasswordSchema,
  ordineSchema,
  contoSchema,
};
