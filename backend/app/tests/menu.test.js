const fetchAPI = require('./utils').fetchAPI
const makeString = require('./utils').makeString
const makeNumber = require('./utils').makeNumber

const generaJWT = require('../gestori/GestoreProfilo').generaJWT
const getMenu = require('../gestori/GestoreMenu').getMenu
const User = require("../db/utente").User

const piatti = require('../utils/piatti.json')
const utenti = require('../utils/utenti.json')
const utenteManager = utenti.find((utente) => utente.userType === 'Manager')

describe('Menu', () => {

    describe('GET /menu', () => {
        it('should return 200', async () => {
            const res = await fetchAPI('/menu', 'GET')
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('POST /menu', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await fetchAPI('/menu', 'POST', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili,
            })
            expect(res.statusCode).toEqual(401)
        })
        it('should return 401 if user is not a manager', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili,
            }, makeString(token.length))
            expect(res.statusCode).toEqual(401)
        })
        it('should return 424 if name is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: '',
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili,
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if price is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: piatti[0].nome,
                prezzo: makeString(10),
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili,
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if category is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: makeString(10),
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili,
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if available is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: makeString(10),
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili,
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if description is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: 1234,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili,
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if allergens is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: makeString(10),
                ingredientiModificabili: piatti[0].ingredientiModificabili,
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if modifiable ingredients is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: makeString(10),
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 201 if all fields are valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI('/menu', 'POST', {
                nome: makeString(10),
                prezzo: makeNumber(4),
                categoria: {
                    "primaria": makeString(10),
                    "secondaria": makeString(10)
                },
                disponibile: true,
                descrizione: makeString(10),
                allergeni: [makeString(10), makeString(10)],
                ingredientiModificabili: [makeString(10), makeString(10)]
            }, token)
            expect(res.statusCode).toEqual(201)
        })
    })

    describe('PUT /menu/:idPiatto', () => {
        it('should return 401 if user is not logged in', async () => {
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili
            })
            expect(res.statusCode).toEqual(401)
        })
        it('should return 401 if user is not a manager', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili
            }, makeString(token.length))
            expect(res.statusCode).toEqual(401)
        })
        it('should return 424 if name is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: '',
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if price is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: piatti[0].nome,
                prezzo: makeString(10),
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if category is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: makeString(10),
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if available is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: makeString(10),
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if description is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: 1234,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: piatti[0].ingredientiModificabili
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if allergens is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: makeString(10),
                ingredientiModificabili: piatti[0].ingredientiModificabili
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if modifiable ingredients is not valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: piatti[0].nome,
                prezzo: piatti[0].prezzo,
                categoria: piatti[0].categoria,
                disponibile: piatti[0].disponibile,
                descrizione: piatti[0].descrizione,
                allergeni: piatti[0].allergeni,
                ingredientiModificabili: makeString(10)
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 200 if all fields are valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'PUT', {
                nome: makeString(10),
                prezzo: makeNumber(4),
                categoria: {
                    "primaria": makeString(10),
                    "secondaria": makeString(10)
                },
                disponibile: true,
                descrizione: makeString(10),
                allergeni: [makeString(10), makeString(10)],
                ingredientiModificabili: [makeString(10), makeString(10)]
            }, token)
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('DELETE /menu/:idPiatto', () => {
        it('should return 401 if user is not logged in', async () => {
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'DELETE')
            expect(res.statusCode).toEqual(401)
        })
        it('should return 401 if user is not a manager', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'DELETE', {}, makeString(token.length))
            expect(res.statusCode).toEqual(401)
        })
        it('should return 200 if id is valid', async () => {
            const utenteManagerId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const token = generaJWT(utenteManagerId, utenteManager.email)
            const res = await fetchAPI(`/menu/${idPiatto}`, 'DELETE', {}, token)
            expect(res.statusCode).toEqual(200)
        })
    })
})