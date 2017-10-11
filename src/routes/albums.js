const db = require('../db')
const albums = require('express').Router()

albums.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      db.getReviewsByAlbum(album.id, (error, reviews) => {
        res.render('album', {album, reviews, user: req.session.user})
      })
    }
  })
})

albums.get('/:albumID/reviews/new', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      res.render('new_review', {album, user: req.session.user})
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
  
  db.addReview(reviewData, (error, review) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      console.log('Is this the new reviewwww????', review)

      console.log('am I getting the review data at least????', reviewData)
      res.redirect(`/albums/${albumID}`)
    }
  })


})

//Use a delete review query in a post route here::::





module.exports = albums
