const get = require('./get.js')
const getById = require('./getById.js')
const login = require('./login.js')
const getProfile = require('./getProfile.js')
const post = require('./post.js')
const put = require('./put.js')

module.exports = {
    "/v1/travellog/user/": {
        ...get,
        ...post
    },
    "/v1/travellog/login/": {
        ...login
    },
    "/v1/travellog/user/{id}": {
        ...getById,
        ...getProfile, 
        ...put,
    }
}