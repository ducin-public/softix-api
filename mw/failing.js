const { logMessage } = require('../lib/util')

const FAIL_STATUS = 500

const matchingStrategy = (failUrlsCommaSeparated) => {
  if (failUrlsCommaSeparated === null) {
    return () => true
  } else {
    const urls = failUrlsCommaSeparated.split(',')
    return (requestURL) => urls.some(url => requestURL.includes(url))
  }
}

const logFailingInfo = (failProbability, failUrlsCommaSeparated) => {
  let str = `Failing probability is ${failProbability}`
  if (failProbability) {
    if (failUrlsCommaSeparated === null) {
      str += `, all URLs are possible to fail`
    } else {
      str += `, URLs possible to fail are: ${ failUrlsCommaSeparated.split(',').join(', ')}`
    }
  }
  return str
}

module.exports = (failProbability, failUrlsCommaSeparated) => {
  logMessage(() => logFailingInfo(failProbability, failUrlsCommaSeparated))

  const failNow = () => Math.random() < failProbability
  const matchesUrls = matchingStrategy(failUrlsCommaSeparated)

  return (req, res, next) => {
    if (matchesUrls(req.originalUrl) && failNow()) {
      console.log(`the ${req.method} ${req.originalUrl} request is destined to fail`)
      res.status(FAIL_STATUS)
      throw new Error('RANDOM FAIL DUDE')
    } else {
      next()
    }
  }
}
