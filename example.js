const secretBlob = require('.')

const key = secretBlob.keygen()

const message = Buffer.from('Hello world')

const encrypted = secretBlob.encrypt(message, key)

const decrypted = secretBlob.decrypt(encrypted, key)

console.log(decrypted.toString())
