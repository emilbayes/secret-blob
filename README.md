# `secret-blob`

[![Build Status](https://travis-ci.org/emilbayes/secret-blob.svg?branch=master)](https://travis-ci.org/emilbayes/secret-blob)

> Tiny module for easy encryption of Buffers

## Usage

```js
const secretBlob = require('secret-blob')

const key = secretBlob.keygen()

const message = Buffer.from('Hello world')

const encrypted = secretBlob.encrypt(message, key)

const decrypted = secretBlob.decrypt(encrypted, key)

console.log(decrypted.toString()) // Hello world
```

## API

### `const key = secretBlob.keygen([key])`

Generate a new key. Optionally pass `Buffer` `key` to write to.
Must be `secretBlob.KEYBYTES` long.

Returns a `sodium-native` secret `Buffer`.

### `const ciphertext = secretBlob.encrypt(plaintext, key, [ciphertext])`

Encrypt `plaintext` under `key`.  Optionally pass `Buffer` `ciphertext` to write
to. Must be `secretBlob.encryptLength(plaintext)` long.

Returns a normal `Buffer`.

### `const byteLength = secretBlob.encryptLength(plaintext)`

Returns the number of bytes required to encrypt `plaintext`.
Simply `plaintext.byteLength + secretBlob.HEADERBYTES`.

### `const plaintext = secretBlob.decrypt(ciphertext, key, [plaintext])`

Decrypt `ciphertext` under `key`.  Optionally pass `Buffer` `plaintext` to write
to. Must be `secretBlob.decryptLength(plaintext)` long.

Returns a `sodium-native` secret `Buffer`.

### `const byteLength = secretBlob.decryptLength(ciphertext)`

Returns the number of bytes required to encrypt `ciphertext`.
Simply `ciphertext.byteLength - secretBlob.HEADERBYTES`.

### Constants

- `KEYBYTES`: Byte length of a key
- `HEADERBYTES`: Byte length of the header added to ciphertext

## Install

```sh
npm install secret-blob
```

## License

[ISC](LICENSE)
