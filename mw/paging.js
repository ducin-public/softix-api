module.exports = (maxPageSize) => {
  setTimeout(() => {
    console.log(`Max pagesize is ${maxPageSize}`)
  }, 0)

  return (req, res, next) => {
    if (!req.query._limit || parseInt(req.query._limit) > maxPageSize) {
      req.query._limit = maxPageSize
    }
    next()
  }
}
