const db = require('../db')
const auth = require('express').Router()

auth.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', {error, user})
    } else {
      db.getRecentReviews((error, reviews) => {
        if (error) {
          res.status(500).render('error', {error, user: req.session.user})
        } else {
          res.render('index', {albums, reviews, user: req.session.user})
        }
      })
    }
  })
})

auth.get('/signup', (req, res) => {
  res.render('sign_up')
})

auth.post('/signup', (req, res) => {
  const userData = req.body
  const {name, email, password} = userData
  db.signUp(userData, (error, newUser) => {
    console.log('who is this new User???', newUser)
    const user = newUser[0]
    req.session.user = user
    res.redirect('/')
  })
})

auth.get('/signin', (req, res) => {
  res.render('sign_in')
})

auth.post('/signin', (req, res) => {
  const userData = req.body
  const {email, password} = userData
  db.signIn(userData, (error, signedInUser) => {
    const user = signedInUser[0]
    req.session.user = user
    res.redirect('/')
  })
})

auth.get('/signout', (req, res) => {
  req.session.user = null
  res.redirect('/')
})

module.exports = auth
