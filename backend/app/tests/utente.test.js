const fetchAPI = require('./utils').fetchAPI
const makeString = require('./utils').makeString

const generaJWT = require('../gestori/GestoreProfilo').generaJWT
const User = require("../db/utente").User

const utenti = require('../utils/utenti.json')
const utente = utenti.find((utente) => utente.userType === 'UtenteLoggato')

describe('Utente', () => {
    
    describe('GET /utente/profilo', () => {
        it('should return 401 if token is not valid', async () => {
            const res = await fetchAPI('/utente/profilo', 'GET')
            expect(res.status).toBe(401)
        })
        it('should return 200', async () => {
            const utenteId = await User.findOne({ email: utente.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utente.email)
            const res = await fetchAPI('/utente/profilo', 'GET', {}, token)
            expect(res.status).toBe(200)
        })
    })
})