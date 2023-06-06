const populate = require('../utils/populate').populate
const deleteDatabase = require('../utils/populate').deleteDatabase

async function setup() {
    await deleteDatabase().catch(err => console.log(err))
    await populate().catch(err => console.log(err))
}

module.exports = setup