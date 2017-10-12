const db = require('../db')
const users = require('express').Router()

users.get('/:userID', (req, res) => {
  const userID = req.params.userID

  db.getUsersByID(userID, (error, users) => {
    if (error) {

      res.status(500).render('error', {error, user: req.session.user})

    } else {

      const profile = users[0]

      db.getReviewsByUser(profile.id, (error, reviews) => {
        if (error) {

          res.status(500).render('error', {error, user: req.session.user})

        } else {

          res.render('user', {profile, reviews, user: req.session.user})

        }
      })
    }
  })
})

module.exports = users
