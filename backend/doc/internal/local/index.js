const getById = require('./getById.js')
const post = require('./post.js')
const put = require('./put.js')
const deleteLocal = require('./delete.js')

module.exports = {
    "/v1/travellog/local/": {
        ...post
    },
    "/v1/travellog/local/{id}": {
        ...getById,
        ...put,
        ...deleteLocal
    }
}