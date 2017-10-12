const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

//home page queries:
function getAlbums(cb) {
  _query('SELECT * FROM albums', [], cb)
}

function getAlbumsByID(albumID, cb) {
  _query('SELECT * FROM albums WHERE id = $1', [albumID], cb)
}

function getRecentReviews(cb) {
  _query(`SELECT
            reviews.*, albums.title AS album_reviewed, users.name AS author_name
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

//album page queries:
function getReviewsByAlbum(albumID, cb) {
  _query(`SELECT
            reviews.*, albums.id, reviews.review_date, albums.title AS album_reviewed, users.name AS author_name
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

function addReview(reviewData, cb) {
  _query(`INSERT INTO
            reviews (content, author, album)
          VALUES
            ($1, $2, $3)
          RETURNING
            *`, [reviewData.content, reviewData.author, reviewData.album], cb)
}

//user page queries:
function getUsersByID(userID, cb) {
  _query('SELECT * FROM users WHERE id = $1', [userID], cb)
}

function getReviewsByUser(userID, cb) {
  _query(`SELECT
            reviews.*, reviews.review_date, albums.title AS album_reviewed, users.name AS author_name
          FROM
            reviews, albums, users
          WHERE
            users.id = $1
          AND
            users.id = reviews.author
          AND
            albums.id = reviews.album
          ORDER BY
            review_date DESC`, [userID], cb)
}

//authentication queries:
function signUp(userData, cb) {
  _query(`INSERT INTO
            users (name, email, password)
          VALUES
            ($1, $2, $3)
          RETURNING
            *`, [userData.name, userData.email, userData.password], cb)
}

function checkIfExists(userData, cb) {
  _query(`SELECT
            *
          FROM
            users
          WHERE
            email = $1`, [userData.email], cb)
}

function signIn(userData, cb) {
  _query(`SELECT
            *
          FROM
            users
          WHERE
            email = $1
          AND
            password = $2`, [userData.email, userData.password], cb)
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
  getReviewsByAlbum,
  addReview,
  getUsersByID,
  getReviewsByUser,
  signUp,
  checkIfExists,
  signIn
}
