
const backendUrl = 'http://backend:3001/api/v1'
// const backendUrl = 'https://bookeat.mooo.com:4200/api/v1'
//const backendUrl = 'http://129.152.28.176:3001/api/v1'

async function fetchAPI(endpoint, method, body = {}) {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }
    if (document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))) {
        let token = document.cookie.split('; ').find(row => row.startsWith('jwt=')).split('=')[1]
        requestOptions['credentials'] = 'include'
        requestOptions['headers']['Cookie'] = "jwt=" + token
    }
    if (method != 'GET') {
        requestOptions["body"] = JSON.stringify(body)
    }
    let rt = await fetch(backendUrl.concat(endpoint), requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data['success'] && JSON.stringify(data['data']) === JSON.stringify({})) {
                return { "status": data['success'], "data": data['message'] }
            } else if (data['success']) {
                return { "status": data['success'], "data": data['data'] }
            } else {
                return { "status": data['success'], "message": data['error'] }
            }
        })
    return (rt)
}

// API: GET /menu, get all plates in the menu
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function getMenu() {
    return (await fetchAPI('/menu', 'GET'))
}

// API: POST /menu, insert a new plate,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function insertPlate(name, price, category, available, description, allergenes, ingredients) {
    return (await fetchAPI('/menu', 'POST', {
        "nome": name, // string
        "prezzo": price, // int in cents (e.g. 1000 = 10€)
        "categoria": category, // object of strings (e.g. {"primaria": "Antipasti", "secondaria": "Terra"})
        "disponibile": available, // int to represent boolean (e.g. 1 = true, 0 = false)
        "descrizione": description, // string
        "allergeni": allergenes, //list of strings (e.g. ["Glutine", "Lattosio"])
        "ingredientiModificabili": ingredients // list of strings (e.g. ["Pomodoro", "Mozzarella"])
    }))
}

// API: PUT /menu, edit a plate,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function editPlate(plateID, name, price, category, available, description, allergenes, ingredients) {
    return (await fetchAPI('/menu/'.concat(plateID), 'PUT', {
        "nome": name, // string
        "prezzo": price, // int in cents (e.g. 1000 = 10€)
        "categoria": category, // object of strings (e.g. {"primaria": "Antipasti", "secondaria": "Terra"})
        "disponibile": available, // int to represent boolean (e.g. 1 = true, 0 = false)
        "descrizione": description, // string
        "allergeni": allergenes, //list of strings (e.g. ["Glutine", "Lattosio"])
        "ingredientiModificabili": ingredients // list of strings (e.g. ["Pomodoro", "Mozzarella"])
    }))
}

// API: DELETE /menu, delete a plate,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function deletePlate(plateID) {
    return (await fetchAPI('/menu/'.concat(plateID), 'DELETE'))
}

// API: POST /conto/apriConto, open a new bill,
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the data or the error message
export async function openBill(body) {
    return (await fetchAPI('/conto/apriConto', 'POST', body))
}

// API: POST /conto/invioOrdine, send an order,
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the data or the error message
export async function sendOrder(order) {
    return (await fetchAPI('/conto/invioOrdine', 'POST', order))
}

// API: POST /conto/chiudiConto, close a bill,
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the data or the error message
export async function closeBill() {
    return (await fetchAPI('/conto/chiudiConto', 'POST'))
}

// API: PUT /conto/inviaConto, send a bill,
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the data or the error message
export async function getBill() {
    return (await fetchAPI('/conto/inviaConto', 'PUT'))
}


// API POST /auth/signUp, sign up a new user,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function signUp(email, pw, username) {
    let data = await fetchAPI('/auth/signup', 'POST', {
        "email": email,
        "password": pw,
        "nome": username
    })

    if (data['status']) {
        let token = data['data']['token']
        let userType = data['data']['userType']
        document.cookie = "jwt=" + token + "; path=/; max-age=86400; samesite=lax"
        document.cookie = "userType=" + userType + "; path=/; max-age=86400; samesite=lax"
        return { "status": data['status'], "data": data['data'] }
    } else {
        return { "status": data['status'], "message": data['message'] }
    }
}

// API POST /auth/login, login a user,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function login(email, pw) {
    let data = await fetchAPI('/auth/login', 'POST', {
        "email": email,
        "password": pw
    })
    if (data['status']) {
        let token = data['data']['token']
        let userType = data['data']['userType']
        // let userType = "Manager"
        document.cookie = "jwt=" + token + "; path=/; max-age=86400; samesite=lax"
        document.cookie = "userType=" + userType + "; path=/; max-age=86400; samesite=lax"
        return { "status": data['status'], "data": data['data'] }
    } else {
        return { "status": data['status'], "message": data['message'] }
    }
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
        // delete all from local storage
        localStorage.clear()
        return { "status": true, "message": "User logged out" }
    } else {
        return { "status": false, "message": "User not logged in" }
    }
}

export async function userInfo() {
    return (await fetchAPI('/utente/profilo', 'GET'))
}

export async function changePassword(vecchiapassword, nuovapassword) {
    return (await fetchAPI('/utente/password', 'PUT', {
        "vecchiaPassword": vecchiapassword,
        "nuovaPassword": nuovapassword
    }))
}

export async function changeUsername(nome) {
    return (await fetchAPI('/utente/nome', 'PUT', {
        "nome": nome
    }
    ))
}

export async function deleteAccount(password) {
    return (await fetchAPI('/utente/profilo', 'DELETE', {
        "password": password
    }
    ))
}

export async function changeUsernameById(nome, id) {
    return (await fetchAPI('/utente/nome'.concat(id), 'PUT', {
        "nome": nome
    }
    ))
}

export async function changePasswordById(vecchiapassword, nuovapassword, id) {
    return (await fetchAPI('/utente/password'.concat(id), 'PUT', {
        "vecchiaPassword": vecchiapassword,
        "nuovaPassword": nuovapassword
    }))
}

export async function deleteAccountById(id) {
    return (await fetchAPI('/utente/profilo/'.concat(id), 'DELETE'))
}

//altro modo per fare  /utente/profilo/'.concat(id) è `/utente/profilo/${id}`
