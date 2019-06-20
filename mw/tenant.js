module.exports = (tenantRequired) => {
  if (!tenantRequired) {
    return (req, res, next) => {
      next()
    }
  }

  setTimeout(() => {
    console.log('TenantID header required for most resources')
  }, 0)

  const allowedTenantIDs = [
    'E2B31329-8818-428A-90DC-8F065318C052'
  ];

  // lowercased: https://stackoverflow.com/a/43666082
  const TenantIDHeader = 'tenantid'

  const openedResources = ['/db', '/license']
  const resourceIsOpened = url =>
    openedResources.some(resUrl => url.startsWith(resUrl))

  return (req, res, next) => {
    if (resourceIsOpened(req.url)) {
      next()
    } else {
      if (!req.headers[TenantIDHeader]) {
        res.status(400)
        res.send('`TenantID` header is required')
      } else if (!allowedTenantIDs.includes(req.headers[TenantIDHeader])) {
        res.status(404)
      } else {
        next()
      }
    }
  }
}
