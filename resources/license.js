const fs = require('fs')

let licenseContent = null;

fs.readFile(`${__dirname}/license.txt`, (err, data) => {
  licenseContent = data
  console.log('License file loaded and available under /license')
});

module.exports = (req, res, next) => {
  console.log(req.headers)
  if (!licenseContent) {
    res.status(503)
    res.send('This resource is not yet available. Try later.')
  } else if (!req.headers['content-type'] || !req.headers['content-type'].includes('text/plain')) {
    res.status(400)
    res.send('Only `text/plain` media type is supported (set `Content-Type` header).')
  } else {
    res.set('Content-Type', 'text/plain')
    res.send(licenseContent)
  }
}
