const get = require('./get.js')
const getById = require('./getById.js')
const post = require('./post.js')
const put = require('./put.js')
const deleteUser = require('./delete.js')

module.exports = {
    "/v1/travellog/user/": {
        ...get,
        ...post
    },
    "/v1/travellog/user/{id}": {
        ...getById,
        ...put,
        ...deleteUser
    }
}