const router = require('express').Router()
const albums = require('./albums')
const auth = require('./auth')
const users = require('./users')
const middleware = require('./middleware')

router.use('/', auth)
router.use(middleware.ensureLoggedIn)
router.use('/albums', albums)
router.use('/users', users)

module.exports = router
