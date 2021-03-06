const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const routes = require('./routes')
const session = require('express-session')

const port = process.env.PORT || 3000

const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
  secret: 'basketball jones',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secureProxy: true,
    maxAge: 600000
  }
}))

app.use((req, res, next) => {
  res.locals.error = ''
  res.locals.user = {}
  next();
})

app.use('/', routes)

app.use((req, res) => {
  res.status(404).render('not_found', {user: req.session.user})
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
