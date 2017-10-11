
const ensureLoggedIn = (req, res, next) => {
  if(!req.session.user){
    res.render('sign_in', {user: null})
  } else {
    next()
  }
}

module.exports = {
  ensureLoggedIn
}
