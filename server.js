const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const express = require('express')

const licenseResource = require('./resources/license')
const tenantMiddleware = require('./mw/tenant')
const pagingMiddleware = require('./mw/paging')
const delayingMiddleware = require('./mw/delaying')
const failingMiddleware = require('./mw/failing')

const argv = require('yargs')
  .option('port', {
    alias: 'p',
    default: 3000,
    describe: 'Service port',
    type: 'number'
  })
  .option('delay', {
    alias: 'd',
    default: 1000,
    describe: 'Minimum delay (+ random)',
    type: 'number'
  })
  .option('fail', {
    alias: 'f',
    default: 0,
    describe: 'Probability of requests to randomly fail (0..1)',
    type: 'number'
  })
  .option('failUrls', {
    default: null,
    describe: 'Comma-separated list of pattern-matched urls to randomly fail',
    type: 'string'
  })
  .option('tenantRequired', {
    alias: 't',
    default: false,
    describe: 'TenantID header is required',
    type: 'boolean'
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
server.use(delayingMiddleware(argv.delay))
server.get('/license', licenseResource())
server.use(tenantMiddleware(argv.tenantRequired))
server.use(pagingMiddleware(50))
server.use(failingMiddleware(argv.fail, argv.failUrls))
server.use(router)

server.use(function (err, req, res, next) {
  // console.error(err); // full error message
  console.error(`error "${err.message}" occured for ${req.method} ${req.originalUrl}`); // request URL only
  res.sendFile(__dirname + '/images/error/error.html');
})

server.listen(argv.port, () => {
  console.log('JSON Server is running on http://localhost:' + argv.p)
})
