const { listConfessions, createConfession } = require('../model/confessions.js')
const { getSession } = require('../model/session.js')
const { Layout } = require('../templates.js')

const error = (res) => res.status(401).send("<h1>Don't be weird! 👀</h1>")

function get(req, res) {
  const sid = req.signedCookies.sid
  const userId = getSession(sid)?.user_id
  const pageOwnerId = Number(req.params.user_id)

  if (userId !== pageOwnerId) return error(res)

  const confessions = listConfessions(req.params.user_id)
  const title = 'Your secrets'
  const content = /*html*/ `
    <div class="Cover">
      <h1>${title}</h1>
      <form method="POST" class="Stack" style="--gap: 0.5rem">
        <textarea name="content" aria-label="your confession" rows="4" cols="30" style="resize: vertical"></textarea>
        <button class="Button">Confess 🤫</button>
      </form>
      <ul class="Center Stack">
        ${confessions
          .map(
            (entry) => `
            <li>
              <h2>${entry.created_at}</h2>
              <p>${entry.content}</p>
            </li>
            `
          )
          .join('')}
      </ul>
    </div>
  `
  const body = Layout({ title, content })
  res.send(body)
}

function post(req, res) {
  const sid = req.signedCookies.sid
  const userId = getSession(sid)?.user_id

  if (!userId) return error(res)

  createConfession(req.body.content, userId)
  res.redirect(`/confessions/${userId}`)
}

module.exports = { get, post }
