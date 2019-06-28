const jsonServer = require('json-server')
const express = require('express')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router('db.json')
const db = router.db

const { argv } = require('./lib/cli')
const { logMessage } = require('./lib/util')

const authMiddleware = require('./mw/auth')
const tenantMiddleware = require('./mw/tenant')
const pagingMiddleware = require('./mw/paging')
const delayingMiddleware = require('./mw/delaying')
const failingMiddleware = require('./mw/failing')
const errorMiddleware = require('./mw/error')

const licenseResource = require('./resources/license')
const authResource = require('./resources/auth')

const baseUrl = url => url.split('?')[0]
const isCountRequest = (req) =>
  baseUrl(req.originalUrl).includes('count') || baseUrl(req.originalUrl).includes('count/')

router.render = (req, res) => {
  if (isCountRequest(req)){
    if (res.locals.data instanceof Array) {
      res.jsonp(res.getHeader('x-total-count').value())
    } else {
      res.status(400)
      res.end('Count unavailable on a non-array', 'utf-8')
    }
  } else {
    res.jsonp(res.locals.data)
  }
}

server.use(jsonServer.rewriter(require('./routes.json')))
server.use('/images', express.static('images'))
server.use(middlewares)

server.use(authMiddleware(argv.jwtAuth))
server.use(delayingMiddleware(argv.delay))
server.use(tenantMiddleware(argv.tenantRequired))
server.use(pagingMiddleware(50))
server.use(failingMiddleware(argv.fail, argv.failUrls))

server.get('/license', licenseResource())
server.post('/auth', authResource())

server.use(router)
server.use(errorMiddleware())

server.listen(argv.port, () => {
  logMessage(() => `JSON Server is running on http://localhost: ${argv.p}`)
})
