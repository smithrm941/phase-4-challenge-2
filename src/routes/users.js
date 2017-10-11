const db = require('../db')
const users = require('express').Router()

users.get('/:userID', (req, res) => {
  const userID = req.params.userID

  db.getUsersByID(userID, (error, users) => {
    console.log('who is this user???', users)
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const user = users[0]
      db.getReviewsByUser(user.id, (error, reviews) => {
        console.log('are we getting the reviews????', reviews)
        res.render('user', {user, reviews})
      })
    }
  })
})

module.exports = users
