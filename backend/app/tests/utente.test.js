const fetchAPI = require('./utils').fetchAPI
const makeString = require('./utils').makeString
const makeEmail = require('./utils').makeEmail
const makePassword = require('./utils').makePassword

const generaJWT = require('../gestori/GestoreProfilo').generaJWT
const User = require("../db/utente").User

const utenti = require('../utils/utenti.json')
const utente = utenti.find((utente) => utente.userType === 'UtenteLoggato')
const utenteManager = utenti.find((utente) => utente.userType === 'Manager')

describe('Utente', () => {

    describe('GET /utente/profilo', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await fetchAPI('/utente/profilo', 'GET')
            expect(res.status).toBe(401)
        })
        it('should return 401 if token is not valid', async () => {
            const res = await fetchAPI('/utente/profilo', 'GET', {}, makeString(10))
            expect(res.status).toBe(401)
        })
        it('should return 200', async () => {
            const utenteId = await User.findOne({ email: utente.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utente.email)
            const res = await fetchAPI('/utente/profilo', 'GET', {}, token)
            expect(res.status).toBe(200)
        })
    })
    describe('POST /utente/profilo', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await fetchAPI('/utente/profilo', 'POST', {
                nome: makeString(10),
                email: makeEmail(),
                password: makePassword(),
                userType: 'Sala',
            })
            expect(res.status).toBe(401)
        })
        it('should return 401 if token is not valid', async () => {
            const res = await fetchAPI('/utente/profilo', 'POST', {
                nome: makeString(10),
                email: makeEmail(),
                password: makePassword(),
                userType: 'Sala',
            }, makeString(10))
            expect(res.status).toBe(401)
        })
        it('should return 401 if user is not a manager', async () => {
            const utenteId = await User.findOne({ email: utente.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utente.email)
            const res = await fetchAPI('/utente/profilo', 'POST', {
                nome: makeString(10),
                email: makeEmail(),
                password: makePassword(),
                userType: 'Sala',
            }, token)
            expect(res.status).toBe(401)
        })
        it('should return 424 if user is a manager but nome is not valid', async () => {
            const utenteId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utenteManager.email)
            const res = await fetchAPI('/utente/profilo', 'POST', {
                nome: makeString(101),
                email: makeEmail(),
                password: makePassword(),
                userType: 'Sala',
            }, token)
            expect(res.status).toBe(424)
        })
        it('should return 424 if user is a manager but email is not valid', async () => {
            const utenteId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utenteManager.email)
            const res = await fetchAPI('/utente/profilo', 'POST', {
                nome: makeString(10),
                email: makeString(10),
                password: makePassword(),
                userType: 'Sala',
            }, token)
            expect(res.status).toBe(424)
        })
        it('should return 424 if user is a manager but password is not valid', async () => {
            const utenteId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utenteManager.email)
            const res = await fetchAPI('/utente/profilo', 'POST', {
                nome: makeString(10),
                email: makeEmail(),
                password: makeString(5),
                userType: 'Sala',
            }, token)
            expect(res.status).toBe(424)
        })
        it('should return 424 if user is a manager but userType is not valid', async () => {
            const utenteId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utenteManager.email)
            const res = await fetchAPI('/utente/profilo', 'POST', {
                nome: makeString(10),
                email: makeEmail(),
                password: makePassword(),
                userType: makeString(10),
            }, token)
            expect(res.status).toBe(424)
        })
        it('should return 200', async () => {
            const utenteId = await User.findOne({ email: utenteManager.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utenteManager.email)
            const res = await fetchAPI('/utente/profilo', 'POST', {
                nome: makeString(10),
                email: makeEmail(),
                password: makePassword(),
                userType: 'Sala',
            }, token)
            expect(res.status).toBe(200)
        })
    })
    describe('PUT /utente/password/:id?', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await fetchAPI('/utente/password', 'PUT', {
                vecchiaPassword: utente.password,
                nuovaPassword: makePassword(),
            })
            expect(res.status).toBe(401)
        })
        it('should return 401 if token is not valid', async () => {
            const res = await fetchAPI('/utente/password', 'PUT', {
                vecchiaPassword: utente.password,
                nuovaPassword: makePassword(),
            }, makeString(10))
            expect(res.status).toBe(401)
        })
        it('should return 400 if oldPassword does not correspond to user password', async () => {
            const utenteId = await User.findOne({ email: utente.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utente.email)
            const res = await fetchAPI('/utente/password', 'PUT', {
                vecchiaPassword: makePassword(),
                nuovaPassword: makePassword(),
            }, token)
            expect(res.status).toBe(400)
        })
        it('should return 400 if newPassword is not valid', async () => {
            const utenteId = await User.findOne({ email: utente.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utente.email)
            const res = await fetchAPI('/utente/password', 'PUT', {
                vecchiaPassword: utente.password,
                nuovaPassword: makeString(5),
            }, token)
            expect(res.status).toBe(400)
        })
        it('should return 200', async () => {
            const utenteId = await User.findOne({ email: utente.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utente.email)
            const res = await fetchAPI('/utente/password', 'PUT', {
                vecchiaPassword: utente.password,
                nuovaPassword: makePassword(),
            }, token)
            expect(res.status).toBe(200)
        })
    })
    describe('PUT /utente/nome/:id?', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await fetchAPI('/utente/nome', 'PUT', {
                nome: makeString(10),
            })
            expect(res.status).toBe(401)
        })
        it('should return 401 if token is not valid', async () => {
            const res = await fetchAPI('/utente/nome', 'PUT', {
                nome: makeString(10),
            }, makeString(10))
            expect(res.status).toBe(401)
        })
        it('should return 400 if nome is not valid', async () => {
            const utenteId = await User.findOne({ email: utente.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utente.email)
            const res = await fetchAPI('/utente/nome', 'PUT', {
                nome: makeString(101),
            }, token)
            expect(res.status).toBe(400)
        })
        it('should return 200', async () => {
            const utenteId = await User.findOne({ email: utente.email }).then((res) => res._id)
            const token = generaJWT(utenteId, utente.email)
            const res = await fetchAPI('/utente/nome', 'PUT', {
                nome: makeString(10),
            }, token)
            expect(res.status).toBe(200)
        })
    })
})