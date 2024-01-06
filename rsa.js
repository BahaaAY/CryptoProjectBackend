const forge = require('node-forge');

// Generate RSA key pair
const rsaKeyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
const publicKey = forge.pki.publicKeyToPem(rsaKeyPair.publicKey);
const privateKey = forge.pki.privateKeyToPem(rsaKeyPair.privateKey);

console.log('Public Key:');
console.log(publicKey);

console.log('\nPrivate Key:');
console.log(privateKey);

// Generate AES key
const aesKey = forge.random.getBytesSync(16);

console.log('\nAES Key:');
console.log(forge.util.bytesToHex(aesKey));

// Encrypt AES key with RSA public key
const encryptedAesKey = rsaKeyPair.publicKey.encrypt(aesKey);

console.log('\nEncrypted AES Key:');
console.log(forge.util.bytesToHex(encryptedAesKey));

// Decrypt AES key with RSA private key
const decryptedAesKey = rsaKeyPair.privateKey.decrypt(encryptedAesKey);

console.log('\nDecrypted AES Key:');
console.log(forge.util.bytesToHex(decryptedAesKey));
