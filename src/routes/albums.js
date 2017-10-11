const db = require('../db')
const albums = require('express').Router()

albums.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', {error})
    } else {
      const album = albums[0]
      console.log('what album is this????', album)
      db.getReviewsByAlbum(album.id, (error, reviews) => {
        console.log('are we getting the reviews????', reviews)
        res.render('album', {album, reviews})
      })
    }
  })
})

module.exports = albums
