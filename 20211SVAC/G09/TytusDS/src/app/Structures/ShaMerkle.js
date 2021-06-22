//Codificacion Arbol Merkle
const crypto = require('crypto');

const txToInt256LE = (tx) => {
  const bytes = new Array(32);
  for (var i = 0, j = 31, len = tx.length; i < len; i += 2, j--) {
    bytes[j] = parseInt(tx[i] + tx[i + 1], 16);
  }
  return Buffer.from(bytes);
};

const sha256 = (buffer) => {
  const f = crypto.createHash('sha256');
  const h = f.update(buffer);
  return h.digest();
};

const toReversedHex = (bytes) =>
  bytes
    .reverse()
    .reduce((acc, bytes) => acc + bytes.toString(16).padStart(2, '0'), '');

module.exports = {txToInt256LE, sha256, toReversedHex}