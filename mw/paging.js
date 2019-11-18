const { logConfig } = require('../lib/util')

module.exports = (maxPageSize) => {
  logConfig(() => `Max pagesize is ${maxPageSize}`)

  return (req, res, next) => {
    if (!req.query._limit || parseInt(req.query._limit) > maxPageSize) {
      req.query._limit = maxPageSize
    }
    next()
  }
}
