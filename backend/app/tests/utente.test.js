const fetchAPI = require("./utils").fetchAPI;
const makeString = require("./utils").makeString;
const makeEmail = require("./utils").makeEmail;
const makePassword = require("./utils").makePassword;

const generaJWT = require("../gestori/GestoreProfilo").generaJWT;
const User = require("../db/utente").User;

const utenti = require("../utils/utenti.json");
const utente = utenti.find(
  (utente) =>
    utente.userType === "UtenteLoggato" && utente.email === "utente@gmail.com"
);
const utente2 = utenti.find(
  (utente) =>
    utente.userType === "UtenteLoggato" && utente.email === "utente2@gmail.com"
);
const utente3 = utenti.find(
  (utente) =>
    utente.userType === "UtenteLoggato" && utente.email === "utente3@gmail.com"
);
const utente4 = utenti.find(
  (utente) =>
    utente.userType === "UtenteLoggato" && utente.email === "utente4@gmail.com"
);
const utenteCucina = utenti.find((utente) => utente.userType === "Cucina");
const utenteSala = utenti.find((utente) => utente.userType === "Sala");
const utenteManager = utenti.find((utente) => utente.userType === "Manager");

describe("Utente", () => {
  describe("GET /utente/profilo", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await fetchAPI("/utente/profilo", "GET");
      return expect(res.status).toBe(401);
    });
    it("should return 401 if token is not valid", async () => {
      const res = await fetchAPI("/utente/profilo", "GET", {}, makeString(10));
      return expect(res.status).toBe(401);
    });
    it("should return 200", async () => {
      const utenteId = await User.findOne({ email: utente.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utente.email);
      const res = await fetchAPI("/utente/profilo", "GET", {}, token);
      return expect(res.status).toBe(200);
    });
  });

  describe("POST /utente/profilo", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await fetchAPI("/utente/profilo", "POST", {
        nome: makeString(10),
        email: makeEmail(),
        password: makePassword(),
        userType: "Sala",
      });
      return expect(res.status).toBe(401);
    });
    it("should return 401 if token is not valid", async () => {
      const res = await fetchAPI(
        "/utente/profilo",
        "POST",
        {
          nome: makeString(10),
          email: makeEmail(),
          password: makePassword(),
          userType: "Sala",
        },
        makeString(10)
      );
      return expect(res.status).toBe(401);
    });
    it("should return 401 if user is not a manager", async () => {
      const utenteId = await User.findOne({ email: utente.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utente.email);
      const res = await fetchAPI(
        "/utente/profilo",
        "POST",
        {
          nome: makeString(10),
          email: makeEmail(),
          password: makePassword(),
          userType: "Sala",
        },
        token
      );
      return expect(res.status).toBe(401);
    });
    it("should return 424 if user is a manager but nome is not valid", async () => {
      const utenteId = await User.findOne({ email: utenteManager.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utenteManager.email);
      const res = await fetchAPI(
        "/utente/profilo",
        "POST",
        {
          nome: makeString(101),
          email: makeEmail(),
          password: makePassword(),
          userType: "Sala",
        },
        token
      );
      return expect(res.status).toBe(424);
    });
    it("should return 424 if user is a manager but email is not valid", async () => {
      const utenteId = await User.findOne({ email: utenteManager.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utenteManager.email);
      const res = await fetchAPI(
        "/utente/profilo",
        "POST",
        {
          nome: makeString(10),
          email: makeString(10),
          password: makePassword(),
          userType: "Sala",
        },
        token
      );
      return expect(res.status).toBe(424);
    });
    it("should return 424 if user is a manager but password is not valid", async () => {
      const utenteId = await User.findOne({ email: utenteManager.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utenteManager.email);
      const res = await fetchAPI(
        "/utente/profilo",
        "POST",
        {
          nome: makeString(10),
          email: makeEmail(),
          password: makeString(5),
          userType: "Sala",
        },
        token
      );
      return expect(res.status).toBe(424);
    });
    it("should return 424 if user is a manager but userType is not valid", async () => {
      const utenteId = await User.findOne({ email: utenteManager.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utenteManager.email);
      const res = await fetchAPI(
        "/utente/profilo",
        "POST",
        {
          nome: makeString(10),
          email: makeEmail(),
          password: makePassword(),
          userType: makeString(10),
        },
        token
      );
      return expect(res.status).toBe(424);
    });
    it("should return 200", async () => {
      const utenteId = await User.findOne({ email: utenteManager.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utenteManager.email);
      const res = await fetchAPI(
        "/utente/profilo",
        "POST",
        {
          nome: makeString(10),
          email: makeEmail(),
          password: makePassword(),
          userType: "Sala",
        },
        token
      );
      return expect(res.status).toBe(200);
    });
  });

  describe("DELETE /utente/profilo/:id?", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await fetchAPI("/utente/profilo", "DELETE", {
        password: utente2.password,
      });
      return expect(res.status).toBe(401);
    });
    it("should return 401 if token is not valid", async () => {
      const res = await fetchAPI(
        "/utente/profilo",
        "DELETE",
        {
          password: utente2.password,
        },
        makeString(10)
      );
      return expect(res.status).toBe(401);
    });
    it("should return 401 if password is not valid", async () => {
      const utenteId = await User.findOne({ email: utente2.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utente2.email);
      const res = await fetchAPI(
        "/utente/profilo",
        "DELETE",
        {
          password: makeString(5),
        },
        token
      );
      return expect(res.status).toBe(401);
    });
    it("should return 200 if password is valid and user is valid", async () => {
      const utenteId = await User.findOne({ email: utente2.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utente2.email);
      const res = await fetchAPI(
        "/utente/profilo",
        "DELETE",
        {
          password: utente2.password,
        },
        token
      );
      return expect(res.status).toBe(200);
    });
    it("should return 401 if user is not a manager", async () => {
      const utenteCucinaId = await User.findOne({
        email: utenteCucina.email,
      }).then((res) => res._id);
      const token = generaJWT(utenteCucinaId, utenteCucina.email);
      const utenteSalaId = await User.findOne({ email: utenteSala.email }).then(
        (res) => res._id
      );
      const res = await fetchAPI(
        `/utente/profilo/${utenteSalaId}`,
        "DELETE",
        {},
        token
      );
      return expect(res.status).toBe(401);
    });
    it("should return 424 if user is a manager but id is not valid", async () => {
      const utenteId = await User.findOne({ email: utenteManager.email }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, utenteManager.email);
      const res = await fetchAPI("/utente/profilo/ciao", "DELETE", {}, token);
      return expect(res.status).toBe(424);
    });
    it("should return 200 if password is valid and user is a manager and id is valid", async () => {
      const utenteManagerId = await User.findOne({
        email: utenteManager.email,
      }).then((res) => res._id);
      const token = generaJWT(utenteManagerId, utenteManager.email);
      const utenteId = await User.findOne({ email: utente4.email }).then(
        (res) => res._id
      );
      const res = await fetchAPI(
        `/utente/profilo/${utenteId}`,
        "DELETE",
        {},
        token
      );

      return expect(res.status).toBe(200);
    });
  });

  describe("PUT /utente/password/:id?", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await fetchAPI("/utente/password", "PUT", {
        vecchiaPassword: utente.password,
        nuovaPassword: makePassword(),
      });
      return expect(res.status).toBe(401);
    });
    it("should return 401 if token is not valid", async () => {
      const res = await fetchAPI(
        "/utente/password",
        "PUT",
        {
          vecchiaPassword: utente.password,
          nuovaPassword: makePassword(),
        },
        makeString(10)
      );
      return expect(res.status).toBe(401);
    });
    it("should return 400 if oldPassword does not correspond to user password", async () => {
      let mail = utente.email;

      const user = await User.findOne({ email: mail });
      const utenteId = user._id;

      const token = generaJWT(utenteId, mail);
      const res = await fetchAPI(
        "/utente/password",
        "PUT",
        {
          vecchiaPassword: makePassword(),
          nuovaPassword: makePassword(),
        },
        token
      );
      return expect(res.status).toBe(400);
    });
    it("should return 400 if newPassword is not valid", async () => {
      let mail = utente.email;
      const utenteId = await User.findOne({ email: mail }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, mail);
      const res = await fetchAPI(
        "/utente/password",
        "PUT",
        {
          vecchiaPassword: utente.password,
          nuovaPassword: makeString(5),
        },
        token
      );
      return expect(res.status).toBe(400);
    });
    it("should return 200", async () => {
      const utenteId = await User.findOne({ email: utente3.email }).then(
        (res) => res._id
      );

      const token = generaJWT(utenteId, utente3.email);

      const res = await fetchAPI(
        "/utente/password",
        "PUT",
        {
          vecchiaPassword: "qwertyQ1!",
          nuovaPassword: makePassword(),
        },
        token
      );
      return expect(res.status).toBe(200);
    });
  });

  describe("PUT /utente/nome/:id?", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await fetchAPI("/utente/nome", "PUT", {
        nome: makeString(10),
      });
      return expect(res.status).toBe(401);
    });
    it("should return 401 if token is not valid", async () => {
      const res = await fetchAPI(
        "/utente/nome",
        "PUT",
        {
          nome: makeString(10),
        },
        makeString(10)
      );
      return expect(res.status).toBe(401);
    });
    it("should return 400 if nome is not valid", async () => {
      // const utenteId = await User.findOne({ email: utente.email }).then(
      //   (res) => res._id
      // );
      let mail = utente.email;
      const user2 = await User.findOne({ email: mail });
      const utenteId = user2._id;

      const token = generaJWT(utenteId, mail);
      const res = await fetchAPI(
        "/utente/nome",
        "PUT",
        {
          nome: makeString(101),
        },
        token
      );
      return expect(res.status).toBe(400);
    });
    it("should return 200", async () => {
      let mail = utente.email;
      const utenteId = await User.findOne({ email: mail }).then(
        (res) => res._id
      );
      const token = generaJWT(utenteId, mail);
      const res = await fetchAPI(
        "/utente/nome",
        "PUT",
        {
          nome: makeString(10),
        },
        token
      );
      return expect(res.status).toBe(200);
    });
  });
});
