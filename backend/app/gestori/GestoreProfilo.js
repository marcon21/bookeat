/**
 * Classe che gestisce le operazioni sul profilo
 */

const { db } = require("../db");
const User = require("../db/utente").User;
const jwt = require("jsonwebtoken");

class GestoreProfilo {
  static async creaAccount(nome, tipoUtente, email, password, googleId) {
    const user = await User.create({
      email: email,
      password: password,
      nome: nome,
      userType: tipoUtente,
      googleId: googleId,
    });
    return user;
  }

  static async linkGoogleAccount(email, googleId) {
    let user = await User.findOne({ email: email });

    if (!user) {
      user = await this.creaAccount(
        email,
        "UtenteLoggato",
        email,
        "TOP_SECRET",
        googleId
      );
    }

    if (user.googleId != googleId) {
      let _user = await User.findOneAndUpdate(
        { email: email },
        { googleId: googleId }
      );
      user = await User.findOne({ email: email });
    }

    return user;
  }

  static delinkGoogleAccount() {
    /** TODO */
  }
  static modificaEmail(id, email) {
    /** TODO */
  }
  static modificaPassword(id, vecchiaPassword, nuovaPassword) {
    /** TODO */
  }
  static eliminaAccount(id) {
    /** TODO */
  }
  static modificaNome(id, nome) {
    /** TODO */
  }
  static mandaEmailConferma(id) {
    /** TODO */
  }
  static autentica(id, email, password) {
    /** TODO */
  }

  static generaJWT(id, email) {
    const body = { _id: id, email: email };
    const token = jwt.sign({ user: body }, "TOP_SECRET");
    return token;
  }

  static async getUtente(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }
}
module.exports = GestoreProfilo;
