const pause = require('connect-pause')

const getDelay = () => 500 + Math.random() * 2500

module.exports = function delay(req, res, next) {
  const delayMS = getDelay()
  pause(delayMS)(req, res, next)
}
