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
  static async modificaPassword(id, vecchiaPassword, nuovaPassword) {
    try {
      const user = await User.findById(id);

      if (!user) {
        throw new Error("Utente non trovato");
      }

      // Verifica che la vecchia password fornita corrisponda con password corrente
      if (user.password !== vecchiaPassword) {
        throw new Error("Vecchia password inserita non coriisponde con quella corrente");
      }

      // Aggiorna la password dell'utente con nuova password
      user.password = nuovaPassword;
      await user.save();

      return "Password modificata correttamente";
    } catch (error) {
      throw new Error("Errore nel modificare password");
    }
  }
  static eliminaAccount(id) {
    /** TODO */
  }
  static async modificaNome(id, nome) {
    try {
      const user = await User.findById(id);

      if (!user) {
        throw new Error("Utente non trovato");
      }
      // Aggiorna nome dell'utente con nuovo nome, diverso da quello attuale
      //verifica veridicità
      if(user.nome !== nome){
        user.nome = nome;
        await user.save();
        return "Nome modificato correttamente";
      }else{
        throw new Error("Nome inserito già in uso")
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
