const populate = require('../utils/populate').populate
const deleteDatabase = require('../utils/populate').deleteDatabase

async function setup() {
    await deleteDatabase()
    await populate()
}

module.exports = setup