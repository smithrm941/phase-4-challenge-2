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
        res.render('album', {album, reviews})
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
      console.log('what album is this????', album)
      //placeholder until sign-in is added:
      res.render('new_review', {album})
      // db.addNewReview(album.id, (error, reviews) => {
      //   res.render('new_review', {album, reviews})
      // })
    }
  })
})

module.exports = albums
