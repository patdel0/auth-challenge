const { Layout } = require('../templates.js')

function get(req, res) {
  const title = 'Confess your secrets!'
  if (req.session) return handleLogout(res, title)

  const content = /*html*/ `
    <div class="Cover">
      <h1>${title}</h1>
      <nav><a href="/sign-up">Sign up</a> or <a href="/log-in">log in</a></nav>
    </div>
  `
  const body = Layout({ title, content })
  res.send(body)
}

function handleLogout(res, title) {
  res.send(
    Layout({
      title,
      content: /*html*/ `
        <form action='/log-out' method='POST'>
        <button>Log Out</button>
        </form>
        `,
    })
  )
}

module.exports = { get }
