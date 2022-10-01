const { Layout } = require('../templates.js')
const bcryptjs = require('bcryptjs')
const { createUser } = require('../model/user.js')
const { createSession } = require('../model/session.js')

function get(req, res) {
  const title = 'Create an account'
  const content = /*html*/ `
    <div class="Cover">
      <h1>${title}</h1>
      <form method="POST" class="Row">
        <div class="Stack" style="--gap: 0.25rem">
          <label for="email">email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="Stack" style="--gap: 0.25rem">
          <label for="password">password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button class="Button">Sign up</button>
      </form>
    </div>
  `
  const body = Layout({ title, content })
  res.send(body)
}

function post(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).send('Bad input')

  //  * [1] Hash the password
  bcryptjs.hash(password, 12).then((hashedPassword) => {
    //  * [2] Create the user in the DB
    const userId = createUser(email, hashedPassword).id

    //  * [3] Create the session with the new user's ID
    const sid = createSession(userId)

    //  * [4] Set a cookie with the session ID
    res.cookie('sid', sid, {
      httpOnly: true,
      maxAge: 6000,
      sameSite: 'lax',
    })

    //  * [5] Redirect to the user's confession page (e.g. /confessions/3)
    res.redirect(`/confessions/${userId}`)
  })
}
module.exports = { get, post }
