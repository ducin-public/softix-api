const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const express = require('express')

const licenseResource = require('./resources/license')
const tenantMiddleware = require('./mw/tenant')
const pagingMiddleware = require('./mw/paging')
const delayingMiddleware = require('./mw/delaying')

const argv = require('yargs')
  .option('t', {
    alias: 'tenantRequired',
    default: false,
    describe: 'TenantID header is required',
    type: 'boolean'
  })
  .option('p', {
    alias: 'port',
    default: 3000,
    describe: 'Service port',
    type: 'number'
  })
  .option('d', {
    alias: 'delay',
    default: 1000,
    describe: 'Minimum delay (+ random)',
    type: 'number'
  })
  .argv;

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

server.use(jsonServer.rewriter({
  "/finances/expenses*": "/expenses$1",

  '/:resource/:id/count': '/:resource/:id',
  '/:resource/count?:query': '/:resource?:query',
  '/:resource/count': '/:resource',
}))

server.use('/images', express.static('images'))
server.use(middlewares)
server.use(delayingMiddleware(argv.d))
server.get('/license', licenseResource)
if (argv.t) {
  console.log('TenantID header required for most resources')
  server.use(tenantMiddleware)
}
server.use(pagingMiddleware)
server.use(router)

server.listen(argv.p, () => {
  console.log('JSON Server is running on http://localhost:' + argv.p)
})
