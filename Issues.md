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

`get_sid(headers)` in `2.test.js` is expected to return `xlV693MRp8mRr8XWXRYWxogH` however it is returning:
`sid=s%3ANfAVj0y5T6ioMnw%2BkptSx7u; Max-Age=6; Path=/; Expires=Sat, 01 Oct 2022 15:49:42 GMT; HttpOnly; SameSite=Lax`

Original:

```js
function get_sid(headers) {
  const [sid_cookie] = headers['set-cookie'].split('.')
  const encoded_sid = sid_cookie.replace('sid=s%3A', '')
  return decodeURIComponent(encoded_sid)
}
```

The original `.split('.')` isn't working since the `set-cookie` string doesn't contain `'.'` :

### Solution

```js
// test/helpers.js
...

function get_sid(headers) {
  const [sid_cookie] = headers['set-cookie'].split(';')
  const encoded_sid = sid_cookie.replace('sid=s%3A', '')
  return decodeURIComponent(encoded_sid)
}
...
```

</details>
