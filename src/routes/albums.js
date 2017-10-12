const db = require('../db')
const albums = require('express').Router()

albums.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {

      res.status(500).render('error', {error, user: req.session.user})

    } else {

      const album = albums[0]

      db.getReviewsByAlbum(album.id, (error, reviews) => {
        if (error) {

          res.status(500).render('error', {error, user: req.session.user})

        } else {

          res.render('album', {album, reviews, user: req.session.user})

        }
      })
    }
  })
})

albums.get('/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {

      res.status(500).render('error', {error, user: req.session.user})

    } else {

      const album = albums[0]

      res.render('new_review', {album, user: req.session.user, message: ''})

    }
  })
})

albums.post('/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID

  const reviewData = {
    content: req.body.content,
    author: req.session.user.id,
    album: req.params.albumID,
  }

  if(!reviewData.content) {
    db.getAlbumsByID(albumID, (error, albums) => {
      if (error) {

        res.status(500).render('error', {error, user: req.session.user})

      } else {

        const album = albums[0]

        res.render('new_review', {album, user: req.session.user, message: 'Cannot submit a blank review'})

      }
    })
    
  } else {
    db.addReview(reviewData, (error, review) => {
      if (error) {

        res.status(500).render('error', {error})

      } else {

        res.redirect(`/albums/${albumID}`)

      }
    })
  }
})

module.exports = albums
