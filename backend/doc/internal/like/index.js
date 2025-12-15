const post = require('./post.js')
const getInteract = require('./getInteract.js')

module.exports = {
    "/v1/travellog/like/": {
        ...post
    },

    "/v1/travellog/interacoes/": {
        ...getInteract
    }
}