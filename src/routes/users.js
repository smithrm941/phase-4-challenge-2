const db = require('../db')
const users = require('express').Router()

users.get('/:userID', (req, res) => {
  const userID = req.params.userID

  db.getUsersByID(userID, (error, users) => {
    if (error) {

      res.status(500).render('error', {error, user: req.session.user})

    } else {

      const profile = users[0]

      if(profile) {
        
        db.getReviewsByUser(profile.id, (error, reviews) => {
          if (error) {

            res.status(500).render('error', {error, user: req.session.user})

          } else {

            res.render('user', {profile, reviews, user: req.session.user, cancelToUserPage: true, cancelToAlbumPage: false})

          }
        })

      } else {

        res.status(404).render('not_found', {user: req.session.user})

      }
    }
  })
})

users.post('/:userID/reviews/delete/:reviewID', (req, res) => {
  const {userID, reviewID} = req.params

  db.deleteReview(reviewID, (error, deletedReview) => {
    if (error) {

      res.status(500).render('error', {error, user: req.session.user})

    } else {

      const {userID} = req.params
      res.redirect(`/users/${userID}`)

    }
  })
})

module.exports = users
