const crypto = require("crypto");

// Kunci Public Alice dan Private Bob (Anda bisa menggunakan kunci apa saja)
const alicePublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA31M9/8uXmN1wk5ptqqrv
g4O/5N+bUE8/1gMaZOd4ljTeZeNvsrIq3J1dY25nkibSL4MQ2gUqAaDs7ZxpIWOU
6sJld0MJHb2R5dkBZDOQSsoiScMslNfqME7Vahqi44qSgGv8I7In+FsUyoG6jQWJ
yuRPwkyfHzV9LvB16Ef3Rjfn+5Uds4AjTsMOia74drZf3v/pxoRdjiE/JRp3zHgp
JdVV6fW5zTJF4QBKL6ihXvcZrfT9EnCpCxlPvJIhETx2p5xrxXo6qZrOsZPCiM7i
08ACtM36mcsUn+Y7gTPUQag7bnJ7g06z0uxPf2d3OueyeFdEXJTOkP1DpW9LqUps
8wIDAQAB
-----END PUBLIC KEY-----`;

const bobPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1PpgrjkWvBQZ7
rh0jQhFB1HZqOrl/qA7roDdeY694TlsUWoFLbONb7gCw0hFsNCeDmGcd+4EWxE31
Dk12QJnZDQE++3GAZmJbPHgg8JMEqTsjVKfv24ceUX2QjIEKfbAtUlYAkNliaenL
klZ9v8L5ItVp8mND4bmwWF1EFCcxauvTmr42vnW6FD+AfBxrdtVGgDW9MWE2j/84
LmcvI6Q+TgU+1hgbJLRWTmZm7N+Yx2o02K7Ua6gHukTN1z/shBRQSpaNvGReLCep
ACqa1vF968zphv3hC2cvYG6OpteMbWjlgol6qIiyKHHUVBKHBNiSSKwR37QXissm
7mgZ6DCVAgMBAAECggEAKddQ9uEp2h09YWkRJfYXGMztJ1n2P++yvhenIJ2/wPTJ
1vmL1rdFB5B6zVc5mXKy2pDg4U2SAAkCfDu4iz+fpLl5W6pdighY1Xowu13+erl8
wwvElz1lRI0IgUnGcn8QoG3dF9VYsf0EcbAPUoll//DYNtSzsNSX8wt7QH+sip4i
YcZXiCjVBgI7eGye78WPuuQxtW4ZNrJr+w/D+3EqJdvevF1CD/fUB0ddFC9KzBxi
KY9j9bABez5lK8+QLle08u8yXoFMCkAw7o4Jd5ytHciHcTKEM71jn3+Tn7yhfbfp
q44XVsenGO2pBdMIziydrLX8d1aI9VSq2pbBQWuKEwKBgQDeEx42LEKX+HtIuWY6
jEkLnCr8MSwLUlciYrWQcsqT0qZpR6uoTUfg/4fzvy0pieiaYcjvH660JwtzSjnh
P/93jvUYa2KNIxpY4tMApm40R82SgUYwhcaUb4Vqn5XmiHc4oprbjGxLT1HwR2y6
V0kbIqpIa1fYe4s6uULlwZEk1wKBgQDQ7rFaL6b35I0WCSrS6nKwN7Snu1EwJScP
JcO2L3tGquL7YppmyBpdozc8BJPPnkcY43TogjjmyzihKyQ38+Y/ZLvMQvZqJJYu
zYDpdZqVUmGnIpVUpjEP8/4w8h20Ret0TLBrJ9vHEUjoLrbbOXJ1oMMHHWOrDK/w
9LyX1vf8cwKBgBAbENja8uV0pvRKRei/HdkStWde5ZPYn+slf4d/W8PGxjzibseg
+zKNNb3uwoa9srnnl5wIDzKPllwBKRt1+cAhBROFTjtwLUv+/1CPwXRXNMiISZ/h
Q9qmD+YAtu1mPkdEO7jqgTwg/49Ojssg43NtWy4vYsqXgyx6HSjulek3AoGAJIp6
jjFjXFumqUH1MWo7oMI9YFCMhIUa7bVHI2fugY+Fnz3Bj1RT+CiBkoeial9eQ+YU
Hk4YMZU9VEK9VOPdUx0FE1ZqzmmTsp/SegJNhOwhlB+iSmm+jvG3dUwDEfJgmbiH
6lXQRGKrg6AX7wN/Fz+EnIvxUIspglTrXwsD2C0CgYB6pneVvygVEenVCALz9cIb
EnyFtoV4e/k6SRop2Yi0RyWd4Ewk4a5o7/GlSqhFSVEr+bRxoiemn2YQCjfxJoAJ
RsDwgD6qJil9LGskIUwh531S5f0/cya2lOkzdo2b+MoCnulnRqIw1wCvmoMoSHXq
k6K6nh4+K4v9q7dMuRI+iw==
-----END PRIVATE KEY-----`;

// Signature dan pesan terenkripsi dari Alice
const signature = "3fe2de5c635d838033a52dd0dfa6c8f835ee0a9325df477f5f40992b6ab6cbf1e69b1e606edee7aba89d81d1fae1c50bf19fb914a0de80229e64cd53dd78608fcb578ea9f7085da699fb0f24104bd61cf5a64ea0eb0f6f9d5fb2b7a126d93090d4b49c1d76e9af9bf20fb133e26eed95863ac138d22cc9859e2191f55383c36ac29a13e092f89bfae72213b42fbb41ef12805ce933aa9fea6897cd99e5b9548385f97a4f17d3474debbb97a94c9d99e1254aeea3cd7eb3a5a136887baa32f35c29af5c3e43c33ba2ddd40623794ad175744d28ce822880d398995e41701a5994c68397038d8d99e12953a137ee3ef1f6a66ac1c94451ab8e203ca9ebb9575d3c"; // Gantilah dengan output dari alice.js
const encryptedMessageHex ="b0e665a2a14277d3dac68ea195ac4eef5c7f44284c7922ef99ee4822dd7cc9d8d6978be2f62aa5380a3366962d15aede676c7cc03affc7359d941e5aaf3483f9e4743bc48a5c441ffa25e86ad2e2271e05a339f260cb60b867e1a6cfa945ed1f75ce6855185e2961adc945902b4aff5e6dab4a0d594d51c6ef6aebb07a3cac49cb9086e62fabdb8f1b62f5f6b9d5fa74e0c44b4086d0d7fbd79f2617710162bb86fbe15e754419b5d8e6a8be89cc2c6b762496b59cb817d01050561399c140e34a539236ffcdc6d544dd051fa50fcf311bb055bb9b92e578f3f2bfd4eb7079e0abb3f3d77f3f2d9672bf39bcc0ef18dc7f8945eb801cb91f71b27e1606f26f31" // Gantilah dengan output dari alice.js
const encryptedMessage = Buffer.from(encryptedMessageHex, "hex");

// Dekripsi pesan menggunakan Private Key Bob
const decryptedMessage = crypto.privateDecrypt(
    bobPrivateKeyPem,
    encryptedMessage
);

// Verifikasi signature menggunakan Public Key Alice
const verifier = crypto.createVerify("sha256");
verifier.update(decryptedMessage.toString());
verifier.end();
const isVerified = verifier.verify(alicePublicKeyPem, signature, "hex");

console.log("Signature Verification:", isVerified);
console.log("Message:", decryptedMessage.toString("utf8"))