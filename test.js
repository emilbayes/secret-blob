const test = require('tape')
const secretBlob = require('.')

test('simple', function (assert) {
  const key = secretBlob.keygen()

  const message = Buffer.from('Hello world')

  const encrypted = secretBlob.encrypt(message, key)

  const decrypted = secretBlob.decrypt(encrypted, key)

  assert.ok(decrypted.toString() === 'Hello world')

  assert.end()
})

test('empty', function (assert) {
  const key = secretBlob.keygen()

  const message = Buffer.alloc(0)

  const encrypted = secretBlob.encrypt(message, key)

  const decrypted = secretBlob.decrypt(encrypted, key)

  assert.ok(encrypted.byteLength === secretBlob.HEADERBYTES)
  assert.ok(decrypted.toString() === '')

  assert.end()
})
