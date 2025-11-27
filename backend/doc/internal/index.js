const filter          = require('./filter')
const users           = require('./users')
const travel          = require('./travel')
const midia           = require('./midia')
const log             = require('./log')
const country         = require("./country")
const local           = require("./local")
const comment         = require("./comment")

module.exports = {
    ...users,
    ...log,
    ...comment,
    ...local,
    ...travel,
    ...country,
    ...midia,
    ...filter
}