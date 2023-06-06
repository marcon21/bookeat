const populate = require('../utils/populate').populate
const deleteDatabase = require('../utils/populate').deleteDatabase

async function teardown() {
    await deleteDatabase()
    await populate()
}

module.exports = teardown