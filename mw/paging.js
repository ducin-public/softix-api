const MAX_PAGE_SIZE = 50

module.exports = (req, res, next) => {
  if (!req.query._limit || parseInt(req.query._limit) > MAX_PAGE_SIZE) {
    req.query._limit = MAX_PAGE_SIZE
  }
  next()
}
