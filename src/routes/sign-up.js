const { Layout } = require('../templates.js')
const { createUser } = require('../model/user.js')
const { createSession } = require('../model/session.js')
const bcryptjs = require('bcryptjs')

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

  bcryptjs.hash(password, 12).then((hashedPassword) => {
    const userId = createUser(email, hashedPassword).id
    const sid = createSession(userId)

    res.cookie('sid', sid, {
      signed: true,
      httpOnly: true,
      maxAge: 6000,
      sameSite: 'lax',
    })

    res.redirect(`/confessions/${userId}`)
  })
}
module.exports = { get, post }
