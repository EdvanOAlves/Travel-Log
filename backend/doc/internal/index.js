const users           = require('./users')
const travel          = require('./travel')
const log             = require('./log')
const comment         = require("./comment")
const follow          = require("./follow")
const like            = require("./like")
const favorite        = require("./favorite")

module.exports = {
    ...users,
    ...follow,
    ...log,
    ...comment,
    ...travel,
    ...like,
    ...favorite
}