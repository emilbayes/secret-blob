const assert = require('nanoassert')
const sodium = require('sodium-native')

const KEYBYTES = sodium.crypto_aead_xchacha20poly1305_ietf_KEYBYTES
const NONCEBYTES = sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES
const TAGBYTES = sodium.crypto_aead_xchacha20poly1305_ietf_ABYTES
const HEADERBYTES = NONCEBYTES + TAGBYTES

function keygen (key) {
  if (key == null) key = sodium.sodium_malloc(KEYBYTES)
  assert(key.byteLength === KEYBYTES, 'key must be KEYBYTES long')
  sodium.crypto_aead_xchacha20poly1305_ietf_keygen(key)
  return key
}

function encrypt (plaintext, key, ciphertext) {
  assert(plaintext instanceof Uint8Array)
  var clen = encryptLength(plaintext)
  if (ciphertext == null) ciphertext = new Uint8Array(clen)
  assert(key.byteLength === KEYBYTES, 'key must be KEYBYTES long')
  assert(ciphertext.byteLength === clen, 'ciphertext must be plaintext + HEADERBYTES long')

  const nonce = ciphertext.subarray(0, NONCEBYTES)
  sodium.randombytes_buf(nonce)

  // Kinda SIV
  sodium.crypto_generichash_batch(nonce, [nonce, plaintext], key)

  const c = ciphertext.subarray(NONCEBYTES)

  sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(c, plaintext, null, null, nonce, key)

  return ciphertext
}

function encryptLength (plaintext) {
  assert(plaintext instanceof Uint8Array)
  return plaintext.byteLength + HEADERBYTES
}

function decrypt (ciphertext, key, plaintext) {
  assert(ciphertext instanceof Uint8Array)
  var plen = decryptLength(ciphertext)
  if (plaintext == null) plaintext = sodium.sodium_malloc(plen)
  assert(key.byteLength === KEYBYTES, 'key must be KEYBYTES long')
  assert(plaintext.byteLength === plen, 'plaintext must be ciphertext - HEADERBYTES long')

  const nonce = ciphertext.subarray(0, NONCEBYTES)
  const c = ciphertext.subarray(NONCEBYTES)

  sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(plaintext, null, c, null, nonce, key)

  return plaintext
}

function decryptLength (ciphertext) {
  assert(ciphertext instanceof Uint8Array)
  return ciphertext.byteLength - HEADERBYTES
}

module.exports = {
  keygen,
  encrypt,
  encryptLength,
  decrypt,
  decryptLength,
  KEYBYTES,
  HEADERBYTES
}
