const express = require('express')
const cookieParser = require('cookie-parser')
const home = require('./routes/home.js')
const signup = require('./routes/sign-up.js')
const login = require('./routes/log-in.js')
const logout = require('./routes/log-out.js')
const confessions = require('./routes/confessions.js')
const { getSession } = require('./model/session.js')

const body = express.urlencoded({ extended: false })
const cookies = () => cookieParser(process.env.COOKIE_SECRET)

const server = express()

server.use(cookies())

server.use((req, res, next) => {
  const sid = req.signedCookies?.sid
  req.session = getSession(sid)
  next()
})
// If the session exists attach it to the req object
// Always call the next function to pass the request on to the next handler in the queue
// Tell Express to use the middleware before every request

server.use((req, res, next) => {
  const time = new Date().toLocaleTimeString('en-GB')
  console.log(`${time} ${req.method} ${req.url}`)
  next()
})
server.get('/', home.get)
server.get('/sign-up', signup.get)
server.post('/sign-up', body, signup.post)
server.get('/log-in', login.get)
server.post('/log-in', body, login.post)
server.post('/log-out', logout.post)
server.get('/confessions/:user_id', confessions.get)
server.post('/confessions/:user_id', body, confessions.post)

module.exports = server
