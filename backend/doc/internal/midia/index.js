const getById = require('./getById.js')
const post = require('./post.js')
const put = require('./put.js')
const deleteMidia = require('./delete.js')

module.exports = {
    "/v1/travellog/midia/": {
        ...post
    },
    "/v1/travellog/midia/{id}": {
        ...getById,
        ...put,
        ...deleteMidia
    }
}