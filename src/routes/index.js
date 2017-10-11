const router = require('express').Router()
const albums = require('./albums')
const auth = require('./auth')

router.use('/', auth)
router.use('/albums', albums)

module.exports = router
