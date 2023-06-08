/**
 * Classe che gestisce le operazioni sul profilo
 */

const { db } = require("../db");
const User = require("../db/utente").User;
const jwt = require("jsonwebtoken");
const NotFoundException = require("../exceptions/NotFoundException");
const FailedDependencyException = require("../exceptions/FailedDependencyException");
const Utente = require("../utenti/Utente");
const utente = require("../db/utente");
const UnauthorizedException = require("../exceptions/UnauthorizedException");
const WrongPasswordException = require("../exceptions/WrongPasswordException");

class GestoreProfilo {
  static async creaAccount(nome, tipoUtente, email, password, googleId) {
    // check if email already exists
    let user = await User.findOne({ email: email });
    if (user) throw new FailedDependencyException("Email già in uso");

    user = await User.create({
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

  /**
   * Metodo che modifica la password di un utente
   *
   * @param id - L'id dell'utente di cui modificare la password
   * @param vecchiaPassword - La vecchia password dell'utente
   * @param nuovaPassword - La nuova password dell'utente
   * @returns user - L'utente modificato
   */
  static async modificaPassword(id, vecchiaPassword, nuovaPassword) {
    const user = await User.findById(id).catch((err) => {
      console.error(err);
      throw new NotFoundException("Errore durante il recupero dell'utente");
    });

    // Verifica che la vecchia password fornita corrisponda con password corrente
    const valid = await user.isValidPassword(vecchiaPassword);
    if (!valid) {
      throw new WrongPasswordException(
        "Vecchia password inserita non corrisponde con quella corrente"
      );
    }

    await User.findOneAndUpdate(
      { _id: id },
      { password: await user.hashPassword(nuovaPassword) }
    ).catch((err) => {
      console.error(err);
      throw new NotFoundException("Errore durante la modifica della password");
    });

    return user;
  }

  /**
   *
   * @param id - L'id dell'utente da eliminare
   * @param password - La password dell'utente da eliminare
   *
   */
  static async eliminaAccount(id) {
    await User.deleteOne({ _id: id })
      .then(() => {
        console.log("Utente eliminato con successo");
      })
      .catch((err) => {
        console.error(err);
        throw new FailedDependencyException("Eliminazione utente fallita");
      });
  }

  static async modificaNome(id, nome) {
    try {
      const user = await User.findById(id);

      if (!user) {
        throw new Error("Utente non trovato");
      }
      // Aggiorna nome dell'utente con nuovo nome, diverso da quello attuale
      // verifica veridicità
      if (user.nome !== nome) {
        user.nome = nome;
        await user.save();
        return "Nome modificato correttamente";
      } else {
        throw new Error("Nome inserito già in uso");
      }
    } catch (error) {
      throw new Error("Errore nel modificare nome");
    }
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
