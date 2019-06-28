const { logMessage } = require('../lib/util')

module.exports = (maxPageSize) => {
  logMessage(() => `Max pagesize is ${maxPageSize}`)

  return (req, res, next) => {
    if (!req.query._limit || parseInt(req.query._limit) > maxPageSize) {
      req.query._limit = maxPageSize
    }
    next()
  }
}
