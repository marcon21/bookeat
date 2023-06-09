const { db } = require("../db");

const makeString = require("./utils").makeString;
const fetchAPI = require("./utils").fetchAPI;

const generaJWT = require("../gestori/GestoreProfilo").generaJWT;
const getMenu = require("../gestori/GestoreMenu").getMenu;
const User = require("../db/utente").User;

const utenti = require("../utils/utenti.json");
const utenteTavolo = utenti.find((utente) => utente.userType === "Tavolo");
const UtenteLoggato = utenti.find(
  (utente) =>
    utente.userType === "UtenteLoggato" && utente.email === "utente@gmail.com"
);
const utente2 = utenti.find(
  (utente) =>
    utente.userType === "UtenteLoggato" && utente.email === "utente2@gmail.com"
);

const utenteCameriere = utenti.find((utente) => utente.userType === "Sala");

describe("Conto", () => {
  describe("POST /apriConto", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await fetchAPI("/conto/apriConto", "POST", {
        nCoperti: 1,
      });
      return expect(res.statusCode).toEqual(401);
    });
    it("should return 401 if user is not a Tavolo", async () => {
      let utenteCameriereId = await User.findOne({
        email: utenteCameriere.email,
      }).exec();
      utenteCameriereId = utenteCameriereId._id;

      const token = generaJWT(utenteCameriereId, utenteCameriere.email);
      const res = await fetchAPI(
        "/conto/apriConto",
        "POST",
        {
          nCoperti: 1,
        },
        token
      );
      return expect(res.statusCode).toEqual(401);
    });
    it("should return 424 if nCoperti is not valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;

      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/apriConto",
        "POST",
        {
          nCoperti: makeString(10),
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 201 if nCoperti is valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;

      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/apriConto",
        "POST",
        {
          nCoperti: 1,
        },
        token
      );
      return expect(res.statusCode).toEqual(201);
    });
  });
  describe("POST /invioOrdine", () => {
    it("should return 401 if user is not logged in", async () => {
      const idPiatto = await getMenu().then((r) => r.piatti[0]._id);
      const res = await fetchAPI("/conto/invioOrdine", "POST", {
        portate: [
          {
            idPiatto: idPiatto,
            ingredientiScelti: [makeString(10), makeString(10)],
            note: makeString(10),
            priorita: 1,
          },
          {
            idPiatto: idPiatto,
            ingredientiScelti: [makeString(10), makeString(10)],
            note: makeString(10),
            priorita: 0,
          },
        ],
      });
      return expect(res.statusCode).toEqual(401);
    });
    it("should return 401 if user is not a Tavolo or UtenteLoggato", async () => {
      let utenteCameriereId = await User.findOne({
        email: utenteCameriere.email,
      });
      utenteCameriereId = utenteCameriereId._id;

      const token = generaJWT(utenteCameriereId, utenteCameriere.email);
      const idPiatto = await getMenu().then((r) => r.piatti[0]._id);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [
            {
              idPiatto: idPiatto,
              ingredientiScelti: [makeString(10), makeString(10)],
              note: makeString(10),
              priorita: 1,
            },
            {
              idPiatto: idPiatto,
              ingredientiScelti: [makeString(10), makeString(10)],
              note: makeString(10),
              priorita: 0,
            },
          ],
        },
        token
      );
      return expect(res.statusCode).toEqual(401);
    });
    it("should return 424 if portate is not valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;

      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: makeString(10),
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 424 if portate is empty", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;
      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [],
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 424 if portate elements are not valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;
      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [makeString(10), makeString(10)],
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 424 if portate elements are empty", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;
      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [{}, {}],
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 424 if portate elements idPiatto is not valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;
      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [
            {
              idPiatto: makeString(10),
              ingredientiScelti: [makeString(10), makeString(10)],
              note: makeString(10),
              priorita: 1,
            },
            {
              idPiatto: makeString(10),
              ingredientiScelti: [makeString(10), makeString(10)],
              note: makeString(10),
              priorita: 0,
            },
          ],
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 424 if portate elements ingredientiScelti is not valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;
      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const idPiatto = await getMenu().then((r) => r.piatti[0]._id);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [
            {
              idPiatto: idPiatto,
              ingredientiScelti: makeString(10),
              note: makeString(10),
              priorita: 1,
            },
            {
              idPiatto: idPiatto,
              ingredientiScelti: makeString(10),
              note: makeString(10),
              priorita: 0,
            },
          ],
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 424 if portate elements note is not valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;
      const idPiatto = await getMenu().then((r) => r.piatti[0]._id);
      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [
            {
              idPiatto: idPiatto,
              ingredientiScelti: [makeString(10), makeString(10)],
              note: [1, 2],
              priorita: 1,
            },
            {
              idPiatto: idPiatto,
              ingredientiScelti: [makeString(10), makeString(10)],
              note: [1, 2],
              priorita: 0,
            },
          ],
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 424 if portate elements priorita is not valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;

      const idPiatto = await getMenu().then((r) => r.piatti[0]._id);
      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [
            {
              idPiatto: idPiatto,
              ingredientiScelti: [makeString(10), makeString(10)],
              note: makeString(10),
              priorita: makeString(10),
            },
            {
              idPiatto: idPiatto,
              ingredientiScelti: [makeString(10), makeString(10)],
              note: makeString(10),
              priorita: makeString(10),
            },
          ],
        },
        token
      );
      return expect(res.statusCode).toEqual(424);
    });
    it("should return 201 if portate is valid", async () => {
      let utenteTavoloId = await User.findOne({
        email: utenteTavolo.email,
      }).exec();
      utenteTavoloId = utenteTavoloId._id;
      const idPiatto = await getMenu().then((r) => r.piatti[0]._id);
      const token = generaJWT(utenteTavoloId, utenteTavolo.email);
      const res = await fetchAPI(
        "/conto/invioOrdine",
        "POST",
        {
          portate: [
            {
              idPiatto: idPiatto,
              ingredientiScelti: [makeString(10), makeString(10)],
              note: makeString(10),
              priorita: 1,
            },
            {
              idPiatto: idPiatto,
              ingredientiScelti: [makeString(10), makeString(10)],
              note: makeString(10),
              priorita: 0,
            },
          ],
        },
        token
      );
      return expect(res.statusCode).toEqual(201);
    });
  });
});
