/**
 * La classe padre di tutti i tipi di utente disponibili sull'applicazione
 */
import GestoreMenu from "../gestori/GestoreMenu";


class UtenteAbstract {


    static getMenu() { GestoreMenu.getMenu(); };
}