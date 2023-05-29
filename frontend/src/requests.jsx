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
                return { "status": data['success'], "data": data['data'] }
            } else {
                return { "status": data['success'], "message": data['error'] }
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
                return { "status": data['success'], "data": data['data'] }
            } else {
                return { "status": data['success'], "message": data['error'] }
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
                return { "status": data['success'], "data": data['data'] }
            } else {
                return { "status": data['success'], "message": data['error'] }
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
                return { "status": data['success'], "data": data['data'] }
            } else {
                return { "status": data['success'], "message": data['error'] }
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
                let token = data['data']['token']
                let userType = data['data']['userType']
                document.cookie = "jwt=" + token + "; path=/; max-age=86400; samesite=lax"
                document.cookie = "userType=" + userType + "; path=/; max-age=86400; samesite=lax"
                return { "status": data['success'], "data": data['data'] }
            } else {
                return { "status": data['success'], "message": data['error'] }
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
    let r = await fetch(backendUrl.concat('/auth/login'), requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data['success']) {
                let token = data['data']['token']
                let userType = data['data']['userType']
                document.cookie = "jwt=" + token + "; path=/; max-age=86400; samesite=lax"
                document.cookie = "userType=" + userType + "; path=/; max-age=86400; samesite=lax"
                return { "status": data['success'], "data": data['data'] }
            } else {
                return { "status": data['success'], "message": data['error'] }
            }
        })
    return r
}

// Frontend only - logout a user dropping the cookie
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the message
export async function logout() {
    // check if the cookie exists
    if (document.cookie.split(';').some((item) => item.trim().startsWith('jwt=')) && document.cookie.split(';').some((item) => item.trim().startsWith('userType='))) {
        // if it exists, delete it
        document.cookie = "jwt=; path=/; max-age=0; samesite=lax"
        document.cookie = "userType=; path=/; max-age=0; samesite=lax"
        return { "status": true, "message": "User logged out" }
    } else {
        return { "status": false, "message": "User not logged in" }
    }
}