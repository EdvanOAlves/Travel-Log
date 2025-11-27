const get = require('./get.js')
const getById = require('./getById.js')

module.exports = {
    "/v1/travellog/country/": {
        ...get
    },
    "/v1/travellog/country/{id}": {
        ...getById
    }
}