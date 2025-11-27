const getById = require('./getById.js')
const post = require('./post.js')
const put = require('./put.js')
const deleteComment = require('./delete.js')

module.exports = {
    "/v1/travellog/comment/": {
        ...post
    },
    "/v1/travellog/comment/{id}": {
        ...getById,
        ...put,
        ...deleteComment
    }
}