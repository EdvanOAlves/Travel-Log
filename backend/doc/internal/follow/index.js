const getFollowers = require('./getFollowers.js')
const getFollowing = require('./getFollowing.js')
const post = require('./post.js')
const deleteFollow = require('./deleteFollow.js')

module.exports = {
    "/v1/travellog/following/{id}": {
        ...getFollowing
    },
    "/v1/travellog/followers/{id}": {
       ...getFollowers
    },
    "/v1/travellog/follow/": {
        ...post,
        ...deleteFollow
    }
}