const makeString = require('./utils').makeString
const fetchAPI = require('./utils').fetchAPI

const generaJWT = require('../gestori/GestoreProfilo').generaJWT
const getMenu = require('../gestori/GestoreMenu').getMenu
const User = require("../db/utente").User


const utenti = require('../utils/utenti.json');
const utenteTavolo = utenti.find((utente) => utente.userType === 'Tavolo');
const UtenteLoggato = utenti.find((utente) => utente.userType === 'UtenteLoggato');
const utenteCameriere = utenti.find((utente) => utente.userType === 'Cameriere');

describe('Conto', () => {

    describe('POST /apriConto', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await fetchAPI('/conto/apriConto', 'POST', {
                nCoperti: 1
            })
            expect(res.statusCode).toEqual(401)
        })
        it('should return 401 if user is not a Tavolo', async () => {
            const utenteCameriereId = await User.findOne({ email: utenteCameriere.email }).then((res) => res._id)
            const token = generaJWT(utenteCameriereId, utenteCameriere.email)
            const res = await fetchAPI('/conto/apriConto', 'POST', {
                nCoperti: 1
            }, token)
            expect(res.statusCode).toEqual(401)
        })
        it('should return 424 if nCoperti is not valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/apriConto', 'POST', {
                nCoperti: makeString(10)
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 201 if nCoperti is valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/apriConto', 'POST', {
                nCoperti: 1
            }, token)
            expect(res.statusCode).toEqual(201)
        })
    })
    describe('POST /invioOrdine', () => {
        it('should return 401 if user is not logged in', async () => {
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: 1
                    },
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: 0
                    }
                ]
            })
            expect(res.statusCode).toEqual(401)
        })
        it('should return 401 if user is not a Tavolo or UtenteLoggato', async () => {
            const utenteCameriereId = await User.findOne({ email: utenteCameriere.email }).then((res) => res._id)
            const token = generaJWT(utenteCameriereId, utenteCameriere.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: 1
                    },
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: 0
                    }
                ]
            }, token)
            expect(res.statusCode).toEqual(401)
        })
        it('should return 424 if portate is not valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: makeString(10)
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if portate is empty', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: []
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if portate elements are not valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    makeString(10),
                    makeString(10)
                ]
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if portate elements are empty', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    {},
                    {}
                ]
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if portate elements idPiatto is not valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    {
                        idPiatto: makeString(10),
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: 1
                    },
                    {
                        idPiatto: makeString(10),
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: 0
                    }
                ]
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if portate elements ingredientiScelti is not valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: makeString(10),
                        note: makeString(10),
                        priorita: 1
                    },
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: makeString(10),
                        note: makeString(10),
                        priorita: 0
                    }
                ]
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if portate elements note is not valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: [1, 2],
                        priorita: 1
                    },
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: [1, 2],
                        priorita: 0
                    }
                ]
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 424 if portate elements priorita is not valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: makeString(10)
                    },
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: makeString(10)
                    }
                ]
            }, token)
            expect(res.statusCode).toEqual(424)
        })
        it('should return 201 if portate is valid', async () => {
            const utenteTavoloId = await User.findOne({ email: utenteTavolo.email }).then((res) => res._id)
            const idPiatto = await getMenu().then((r) => r.piatti[0]._id)
            const token = generaJWT(utenteTavoloId, utenteTavolo.email)
            const res = await fetchAPI('/conto/invioOrdine', 'POST', {
                portate: [
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: 1
                    },
                    {
                        idPiatto: idPiatto,
                        ingredientiScelti: [
                            makeString(10),
                            makeString(10)
                        ],
                        note: makeString(10),
                        priorita: 0
                    }
                ]
            }, token)
            expect(res.statusCode).toEqual(201)
        })
    })
})