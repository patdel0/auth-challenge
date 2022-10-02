# Issues

<details>
  <summary>All tests are passing</summary>

### Explanation

The tests are using the functions from the `solution` folder.

### Solution

Change the `DIR` variable value in `test/helpers.js` from `solution` to `src`.

```js
// test/helpers.js
const DIR = 'src'
...
```

</details>

<details>
  <summary>Test 2 fails with error "Expected sign up to create a new session created in the DB"</summary>

### Explanation

The test is expecting a signed cookie.

### Solution

```js
// routes/sign-up.js

res.cookie('sid', sid, {
  signed: true, // Make sure you have set signed to true
  httpOnly: true,
  maxAge: 6000,
  sameSite: 'lax',
})
```

</details>

<details>
  <summary>Test 3 fails with error "Expected log in with wrong email to return 400 status, but got: 302"</summary>

### Explanation

Although it says it is testing for the incorrect email, the email provided in the test is correct.

```js
// 3.test.js

createUser('x@test.com', hash) // x@test.com

const { status } = await request('/log-in', {
  method: 'POST',
  body: 'email=x@test.com&password=incorrect', // x@test.com
  redirect: 'manual',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
})
```

### Solution

Make sure there is a different email being used in the request options.

```js
// test/3.test.js

test('POST /log-in with wrong email returns error', async () => {
  reset()
  const hash = await bcrypt.hash('abc', 12)
  createUser('x@test.com', hash) // x@test.com

  const { status } = await request('/log-in', {
    method: 'POST',
    body: 'email=ya@test.com&password=abc', // ya@test.com
    redirect: 'manual',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })

  assert.equal(
    status,
    400,
    `Expected log in with wrong email to return 400 status, but got: ${status}`
  )
})
```

</details>

<details>
  <summary>Challenge 7 - `req.signedCookies` returns undefined</summary>

### Explanation

The cookies middleware was being run after my middleware function, meaning there wasn't a cookie created when the code ran.

### Solution

Position the challenge 7 middleware function in a way that it runs after cookies in `server.js`

</details>
