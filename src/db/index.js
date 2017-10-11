const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

function getAlbums(cb) {
  _query('SELECT * FROM albums', [], cb)
}

function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM albums WHERE id = $1', [albumID], cb)
}

function getRecentReviews(cb) {
  _query(`SELECT
            reviews.*, albums.title AS album_reviewed, users.name AS author
          FROM
            reviews, albums, users
          WHERE
            albums.id = reviews.album
          AND
            users.id = reviews.author
          ORDER BY
            review_date DESC
          LIMIT
            3`, [], cb)
}

function getReviewsByAlbum(albumID, cb) {
  _query(`SELECT
            reviews.content, reviews.review_date, albums.title AS album_reviewed, users.name AS author
          FROM
            reviews, albums, users
          WHERE
            albums.id = $1
          AND
            users.id = reviews.author
          AND
            albums.id = reviews.album
          ORDER BY
            review_date DESC`, [albumID], cb)
}

function _query(sql, variables, cb) {
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, (error, result) => {
    if (error) {
      console.log('QUERY -> !!ERROR!!')
      console.error(error)
      cb(error)
    } else {
      console.log('QUERY ->', JSON.stringify(result.rows))
      cb(error, result.rows)
    }
  })
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  getRecentReviews,
  getReviewsByAlbum
}
