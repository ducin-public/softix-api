var jwt = require('jsonwebtoken');
const { logMessage } = require('../lib/util')
const config = require('../config.json')

module.exports = () => {
  logMessage(() => 'JWT authorization available under /auth')

  return (req, res, next) => {
    const token = jwt.sign({
      issuer: config.NAME
    }, config.SECRET);

    res.set('Content-Type', 'application/json')
    res.send({
      token
    })
  }
}
