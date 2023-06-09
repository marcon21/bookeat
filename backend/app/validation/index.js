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
    errorMessage: "nCoperti is not valid",
  },
};

const deleteProfileSchema = {
  password: {
    isString: true,
    optional: true,
  },
  id: {
    in: ["params"],
    optional: true,
    isMongoId: true,
  },
};

const piattoSchema = {
  nome: {
    notEmpty: true,
    isString: true,
    required: true,
    errorMessage: "Nome is not valid",
  },
  prezzo: {
    notEmpty: true,
    isInt: true,
    required: true,
    errorMessage: "Prezzo is not valid",
  },
  categoria: {
    required: true,
    notEmpty: true,
    isMap: true,
  },
  disponibile: {
    notEmpty: true,
    isBoolean: true,
    required: true,
    errorMessage: "Disponibile is not valid",
  },
  descrizione: {
    isString: true,
    required: true,
    notEmpty: true,
  },
  allergeni: {
    isArray: true,
    optional: true,
  },
  "allergeni.*": {
    isString: true,
  },
  ingredientiModificabili: {
    isArray: true,
    optional: true,
  },
  "ingredientiModificabili.*": {
    isString: true,
  },
};

const modificaPiattoSchema = {
  nome: {
    notEmpty: true,
    isString: true,
    optional: true,
    errorMessage: "Nome is not valid",
  },
  prezzo: {
    notEmpty: true,
    isInt: true,
    optional: true,
    errorMessage: "Prezzo is not valid",
  },
  categoria: {
    optional: true,
    notEmpty: true,
    isMap: true,
  },
  disponibile: {
    notEmpty: true,
    isBoolean: true,
    optional: true,
    errorMessage: "Disponibile is not valid",
  },
  descrizione: {
    isString: true,
    optional: true,
    notEmpty: true,
  },
  allergeni: {
    isArray: true,
    optional: true,
  },
  "allergeni.*": {
    isString: true,
  },
  ingredientiModificabili: {
    isArray: true,
    optional: true,
  },
  "ingredientiModificabili.*": {
    isString: true,
  },
  idPiatto: {
    in: ["params"],
    required: true,
    isMongoId: true,
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
  deleteProfileSchema,
  piattoSchema,
  modificaPiattoSchema,
};
