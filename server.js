const PORT = 3030

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const express = require('express')

const paging = require('./mw/paging')
const delaying = require('./mw/delaying')

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
  '/:resource/:id/count': '/:resource/:id',
  '/:resource/count?:query': '/:resource?:query',
  '/:resource/count': '/:resource',
}))

server.use('/images', express.static('images'))

server.use(middlewares)
server.use(paging)
server.use(delaying)
server.use(router)
server.listen(PORT, () => {
  console.log('JSON Server is running on http://localhost:' + PORT)
})
