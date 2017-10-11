const db = require('../db')
const users = require('express').Router()

users.get('/:userID', (req, res) => {
  const userID = req.params.userID

  db.getUsersByID(userID, (error, users) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const profile = users[0]
      db.getReviewsByUser(profile.id, (error, reviews) => {
        res.render('user', {profile, reviews, user: req.session.user})
      })
    }
  })
})

//Use a delete review query in a post route here::::

module.exports = users
