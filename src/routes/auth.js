const db = require('../db')
const auth = require('express').Router()

auth.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {

      res.status(500).render('error', {error, user: req.session.user})

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
  res.render('sign_up', {user: null, message: ''})
})

auth.post('/signup', (req, res) => {

  const userData = req.body
  const {name, email, password} = userData

  if(!userData.name || !userData.email || !userData.password){

    res.render('sign_up', {user: null, message: 'No fields can be left blank'})

  } else {

    db.checkIfExists(userData, (error, foundUser) => {
      if (error) {

        res.status(500).render('error', {error, user: req.session.user})

      } else {
        const exists = foundUser[0]

        if(exists) {

          res.render('sign_up', {user: null, message: 'User already exists'})

        } else {
          db.signUp(userData, (error, newUser) => {
            if (error) {

              res.status(500).render('error', {error, user: req.session.user})

            } else {

              const user = newUser[0]
              req.session.user = user
              res.redirect(`/users/${user.id}`)

            }
          })
        }
      }
    })
  }
})

auth.get('/signin', (req, res) => {
  res.render('sign_in', {user: null, message: ''})
})

auth.post('/signin', (req, res) => {

  const userData = req.body
  const {email, password} = userData

  db.signIn(userData, (error, signedInUser) => {

    const user = signedInUser[0]

    if(!user){

      res.render('sign_in', {user: null, message: 'Incorrect email or password'})

    } else {

      req.session.user = user
      res.redirect(`/users/${user.id}`)

    }
  })
})

auth.get('/signout', (req, res) => {
  req.session.user = null
  res.redirect('/')
})

module.exports = auth
