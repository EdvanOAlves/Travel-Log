const get = require('./get.js')
const getById = require('./getById.js')
const post = require('./post.js')
const put = require('./put.js')
const deleteTravel = require('./delete.js')

module.exports = {
    "/v1/travellog/travel/": {
        ...get,
        ...post
    },
    "/v1/travellog/travel/{id}": {
        ...getById,
        ...put,
        ...deleteTravel
    }
}