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

// headers: {
//     'Content-Type': 'application/json',
//     'Authentication': 'Bearer '.concat(token)
// },

// API: GET /menu, get all plates in the menu
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function getMenu() {
    const requestOptions = {
        method: 'GET',
    }
    let r = await fetch(backendUrl.concat('/menu'), requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data['success']) {
                return {"status":data['success'], "data":data['data']}
            } else {
                return {"status":data['success'], "message":data['message']}
            }
        })
    return r
}

// API: POST /menu, insert a new plate,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function insertPlate(name, price, category, available, description, allergenes, ingredients) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
            "nome": name, // string
            "prezzo": price, // int in cents (e.g. 1000 = 10€)
            "categoria": category, // object of strings (e.g. {"primaria": "Antipasti", "secondaria": "Terra"})
            "disponibile": available, // int to represent boolean (e.g. 1 = true, 0 = false)
            "descrizione": description, // string
            "allergeni": allergenes, //list of strings (e.g. ["Glutine", "Lattosio"])
            "ingredientiModificabili": ingredients // list of strings (e.g. ["Pomodoro", "Mozzarella"])
        }
    }
    let r = await fetch(backendUrl.concat('/menu'), requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data['success']) {
                return {"status":data['success'], "data":data['data']}
            } else {
                return {"status":data['success'], "message":data['message']}
            }
        })
    return r
}

// API: PUT /menu, edit a plate,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function editPlate(plateID, name, price, category, available, description, allergenes, ingredients) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: {
            "nome": name, // string
            "prezzo": price, // int in cents (e.g. 1000 = 10€)
            "categoria": category, // object of strings (e.g. {"primaria": "Antipasti", "secondaria": "Terra"})
            "disponibile": available, // int to represent boolean (e.g. 1 = true, 0 = false)
            "descrizione": description, // string
            "allergeni": allergenes, //list of strings (e.g. ["Glutine", "Lattosio"])
            "ingredientiModificabili": ingredients // list of strings (e.g. ["Pomodoro", "Mozzarella"])
        }
    }
    let r = await fetch(backendUrl.concat('/menu/').concat(plateID), requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data['success']) {
                return {"status":data['success'], "data":data['data']}
            } else {
                return {"status":data['success'], "message":data['message']}
            }
        })
    return r
}

// API: DELETE /menu, delete a plate,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function deletePlate(plateID) {
    const requestOptions = {
        method: 'DELETE',
    }
    let r = await fetch(backendUrl.concat('/menu/').concat(plateID), requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data['success']) {
                return {"status":data['success'], "data":data['data']}
            } else {
                return {"status":data['success'], "message":data['message']}
            }
        })
    return r
}

// API POST /auth/signUp, sign up a new user,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
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
        .then(res => res.json())
        .then(data => {
            if (data['success']) {
                return {"status":data['success'], "data":data['data']}
            } else {
                return {"status":data['success'], "message":data['message']}
            }
        })
    return r
}

// API POST /auth/login, login a user,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
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
        .then(res => res.json())
        .then(data => {
            if (data['success']) {
                return {"status":data['success'], "data":data['data']}
            } else {
                return {"status":data['success'], "message":data['message']}
            }
        })
    return token
}