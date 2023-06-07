const request = require('supertest')

function makeString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function makeNumber(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function makeEmail() {
    return makeString(10) + '@gmail.com';
}

function makePassword() {
    // the password must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter and one special character
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*';
    let password = '';
    let counter = 0;
    while (counter < 3) {
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
        counter += 1;
    }
}

async function fetchAPI(endpoint, method, body = {}, token = null) {
    if (token) {
        return (await request('http://localhost:3000/api/v1')[method.toLowerCase()](endpoint).send(body).set('Cookie', [`jwt=${token}`]).set('Access-Control-Allow-Credentials', 'true'))
    } else {
        return (await request('http://localhost:3000/api/v1')[method.toLowerCase()](endpoint).send(body))
    }
}

exports.makeString = makeString
exports.makeEmail = makeEmail
exports.makePassword = makePassword
exports.makeNumber = makeNumber
exports.fetchAPI = fetchAPI