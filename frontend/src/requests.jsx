const backendUrl = 'http://localhost:3001/api/v1'

// Fake /getMenu response - To be deleted afted linking with backend
const r = {
    placement: [
        {
            label: "Antipasti",
            icon: "bi bi-heptagon",
            childrens: [
                {
                    label: "Terra",
                },
                {
                    label: "Mare",
                }
            ]
        },
        {
            label: "Primi",
            icon: "bi bi-dice-1",
            childrens: [
                {
                    label: "Terra",
                },
                {
                    label: "Mare",
                }
            ]
        },
        {
            label: "Secondi",
            icon: "bi bi-dice-2",
            childrens: [
                {
                    label: "Terra",
                },
                {
                    label: "Mare",
                }
            ]
        },
        {
            label: "Pizza",
            icon: "bi bi-dice-3",
            childrens: [
                {
                    label: "Terra",
                },
                {
                    label: "Mare",
                }
            ]
        },
        {
            label: "Dolci",
            icon: "bi bi-tencent-qq",
            childrens: []
        },
        {
            label: "Bevande",
            icon: "bi bi-cup-straw",
            childrens: [
                {
                    label: "Analcolici",
                },
                {
                    label: "Alcolici",
                }
            ]
        },
    ],
    menu: [
        {
            name: "Tagliere di salumi misti",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Antipasto della casa",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Giardiniera",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Tagliere di formaggi",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Antipasto all'italiana",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Terra"
        },
        {
            name: "Pepata di cozze",
            price: 10,
            description: "Lorem Ipsum",
            section: "Antipasti",
            subsection: "Mare"
        },
        {
            name: "Spaghetti MeatBalls",
            price: 10,
            description: "Lorem Ipsum",
            section: "Primi",
            subsection: "Terra"
        },
        {
            name: "Spaghetti Bolognese",
            price: 10,
            description: "Lorem Ipsum",
            section: "Primi",
            subsection: "Mare"
        },
        {
            name: "Tagliata",
            price: 10,
            description: "Lorem Ipsum",
            section: "Secondi",
            subsection: "Terra"
        },
        {
            name: "Frittura mista di pesce",
            price: 10,
            description: "Lorem Ipsum",
            section: "Secondi",
            subsection: "Mare"
        },
        {
            name: "Salamino Piccante",
            price: 10,
            description: "Lorem Ipsum",
            section: "Pizza",
            subsection: "Terra"
        },
        {
            name: "Gamberetti e Zucchine",
            price: 10,
            description: "Lorem Ipsum",
            section: "Pizza",
            subsection: "Mare"
        },
        {
            name: "Tiramisu",
            price: 10,
            description: "Lorem Ipsum",
            section: "Dolci",
        },
        {
            name: "Millefoglie",
            price: 10,
            description: "Lorem Ipsum",
            section: "Dolci",
        },
        {
            name: "Acqua",
            price: 10,
            description: "Lorem Ipsum",
            section: "Bevande",
            subsection: "Analcolici"
        },
        {
            name: "Birra",
            price: 10,
            description: "Lorem Ipsum",
            section: "Bevande",
            subsection: "Alcolici"
        },
    ]
}

// API /menu POST request, returns a json with plates to indicate success, or false
export async function getMenu(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': 'Bearer '.concat(token)
        },
    }
    let r = await fetch(backendUrl.concat('/menu'), requestOptions)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return res.ok
            }
        })
    return r
}

// API /signUp POST request, returns a boolean that indicate the registration success
export async function signUp(email, pw) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "email": email,
            "password": pw
        })
    }
    let r = await fetch(backendUrl.concat('/auth/signup'), requestOptions)
        .then(res => res.ok)
    return r
}

// API /login POST request, returns the token to indicate the login success, or false
export async function login(email, pw) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "email": email,
            "password": pw
        })
    }
    let token = await fetch(backendUrl.concat('/auth/login'), requestOptions)
        .then(res => {
            if (res.ok) {
                return res.json()['token']
            } else {
                return res.ok
            }
        })
    return token
}