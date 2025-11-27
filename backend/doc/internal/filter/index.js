const get = require('./get.js')
const getById = require('./getById.js')

module.exports = {
    "/v1/travellog/filter/": {
        ...get
    },
    "/v1/travellog/filter/{id}": {
        ...getById
    }
}