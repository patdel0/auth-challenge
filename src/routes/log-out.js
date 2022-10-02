const { removeSession } = require('../model/session')

function post(req, res) {
  removeSession(req.session?.id)
  res.clearCookie('sid')
  res.redirect('/')
}

module.exports = { post }
