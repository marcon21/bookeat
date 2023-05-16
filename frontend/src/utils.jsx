// Utilities functions to be used in the app

// Function to create a random string of a given length
export function makeString(length) {
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

// Function to create a random unique key identifier string that includes an index given
export function makeKey(index) {
    return "".concat(index).concat("-").concat(makeString(10))
}