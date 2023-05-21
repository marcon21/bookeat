const backendUrl = 'http://localhost:3001/api/v1'

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