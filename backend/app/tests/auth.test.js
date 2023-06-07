const makeString = require("./utils").makeString;
const makeEmail = require("./utils").makeEmail;
const makePassword = require("./utils").makePassword;
const fetchAPI = require("./utils").fetchAPI;

const utenti = require("../utils/utenti.json");
const utente = utenti.find((utente) => utente.userType === "UtenteLoggato");

describe("Auth", () => {
  describe("POST /signup", () => {
    it("should return 401 if email is not valid", async () => {
      const res = await fetchAPI("/auth/signup", "POST", {
        email: makeString(10),
        password: utente.password,
      });
      expect(res.statusCode).toEqual(401);
    });
    it("should return 401 if password is not valid", async () => {
      const res = await fetchAPI("/auth/signup", "POST", {
        email: makeEmail(),
        password: makeString(10),
      });
      expect(res.statusCode).toEqual(401);
    });
    it("should return 401 if email is already in use", async () => {
      const res = await fetchAPI("/auth/signup", "POST", {
        email: utente.email,
        password: makePassword(),
      });
      expect(res.statusCode).toEqual(401);
    });
    it("should return 200 if email and password are valid", async () => {
      const res = await fetchAPI("/auth/signup", "POST", {
        email: makeEmail(),
        password: makePassword(),
        nome: makeString(5),
      });
      console.log(res.body);
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("POST /login", () => {
    it("should return 401 if email is not valid", async () => {
      const res = await fetchAPI("/auth/login", "POST", {
        email: makeString(10),
        password: utente.password,
      });
      expect(res.statusCode).toEqual(401);
    });
    it("should return 401 if password is not valid", async () => {
      const res = await fetchAPI("/auth/login", "POST", {
        email: utente.email,
        password: makeString(10),
      });
      expect(res.statusCode).toEqual(401);
    });
    it("should return 401 if email is not in use", async () => {
      const res = await fetchAPI("/auth/login", "POST", {
        email: makeEmail(),
        password: utente.password,
      });
      expect(res.statusCode).toEqual(401);
    });
    it("should return 200 if email and password are valid", async () => {
      const res = await fetchAPI("/auth/login", "POST", {
        email: utente.email,
        password: utente.password,
      });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("GET /google", () => {
    it("should return 200", async () => {
      const res = await fetchAPI("/auth/google", "GET");
      expect(res.statusCode).toEqual(200);
    });
  });
});
