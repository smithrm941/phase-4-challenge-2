const router = require('express').Router()
const albums = require('./albums')
const auth = require('./auth')
const users = require('./users')

router.use('/', auth)
router.use('/albums', albums)
router.use('/users', users)

module.exports = router
