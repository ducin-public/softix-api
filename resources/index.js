const express = require('express')

const router = express.Router()

const licenseResource = require('./license')
router.get('/license', licenseResource())

const authResource = require('./auth')
router.post('/auth', authResource())

router.use('/images', express.static('images'))

module.exports = router
