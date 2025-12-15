const users           = require('./users')
const travel          = require('./travel')
const log             = require('./log')
const comment         = require("./comment")
const follow          = require("./follow")
const like            = require("./like")

module.exports = {
    ...users,
    ...follow,
    ...log,
    ...comment,
    ...travel,
    ...like
}