const crypto = require("crypto");

// Kunci Private Alice dan Public Bob (Anda bisa menggunakan kunci apa saja)
const alicePrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfUz3/y5eY3XCT
mm2qqu+Dg7/k35tQTz/WAxpk53iWNN5l42+ysircnV1jbmeSJtIvgxDaBSoBoOzt
nGkhY5TqwmV3QwkdvZHl2QFkM5BKyiJJwyyU1+owTtVqGqLjipKAa/wjsif4WxTK
gbqNBYnK5E/CTJ8fNX0u8HXoR/dGN+f7lR2zgCNOww6Jrvh2tl/e/+nGhF2OIT8l
GnfMeCkl1VXp9bnNMkXhAEovqKFe9xmt9P0ScKkLGU+8kiERPHannGvFejqpms6x
k8KIzuLTwAK0zfqZyxSf5juBM9RBqDtucnuDTrPS7E9/Z3c657J4V0RclM6Q/UOl
b0upSmzzAgMBAAECggEAYIXEbrnqiEXxQcKFsrWVtsRrXHsu0DuobhHCRylqS5WH
KAdwgA4Ui2yyb+bIefkwcBuYXXrM6I5KyPoI0EcPlpW1sCG3n3SPSgYMXWgR7dlG
j5X9P0nA7Octw2HG1EzQvBOwEyeNsgB/0HTYkdn6b8hVFrfyMFV4iSCh/WaZX+28
JDBPgnhJRYrs+JJ7iZBblZbduLVPUicVjgzW8tyahntVUMCgkwJtK4OxYfERld1q
d3fulCqf5tuoD93u4agbLrObOnxStX0fXk3+EZXKKL8MVpPfzkyEZPp0h1+2g2kp
hdiPJIhl3KRPa2OIwY6FVCYTw4mcxrwF4skAF/1DTQKBgQD1IOjOf/mwkjtOlLeS
b8zSWUP/Jqd8Z3RBhSVleWAIA9/My/5TBdO+CB/vWBCm8TvSR+GzFL6Kr/YvrhDu
CJBctwEKFiWK2TulW6w3MKUPgP8F3EgAWFfCYw0ozwM7uYG7uvBQpOZa5UTYKlnb
12a8nAIaQFzIJ6UsR77ywFhMvQKBgQDpOskyZ4IFoj34PWHTnB0ZOXy2YFX8U/up
r2PqZM/32zVCJsrWctIZjOyMOlvuTz9AEfPWSvVBVRl0nAlcSTvd8JBNR/8qNugx
mxXkKZ/iS0XxH2VTN7WWz934sPxRVwvljXMXr2t1E4C9F9mB38n6TkS5vOAyjIex
Nqopes2zbwKBgClj5yuHHGgeKPl5zw1g51rVS8/3fOxao5y0mL3rorV3wgBYqZbn
Mvuxb4MAgb9OmGVHUerlI89TKuSeJamrtISTOg+z8Z7iU1n2grvG8PgPNgCNU3ML
d7YQ95XebpNVHXzPceiMD4FlmRxO+mFOm8BZL1mzaHc7in5RlwJyS/aZAoGAEKw4
J9dIbziq720L6kG1vtDiPnNikjg6vGWiYeY1C8Xq58C4LV5l8JenbVraqY2WuvDN
mpsfLz1zJWfmL2e41OPWnP+xmQX10V4B0Z68JEQ3SsZwyuMnoxFXD+kvEG2FlzJm
cOIEb4kmYd4rmWIzISapORHsgRCUvrFmtrJltBcCgYEA2+Ktq7Vc5ID5gr0R9AB/
N046JKFVvzEMvoyd5IpiinE+ZuvC4lWSW0y7No6EeuPrayKw4chfLIPpXIL4RTUQ
ddpMJlwSSbCer+jpPwqXJ+EMzBGfI/tfNPezj+SaAbm/BEYQMjewl2ytFTvMP5n0
QWm2F+eZpCUneVPFlGvbr8g=
-----END PRIVATE KEY-----`;

const bobPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtT6YK45FrwUGe64dI0IR
QdR2ajq5f6gO66A3XmOveE5bFFqBS2zjW+4AsNIRbDQng5hnHfuBFsRN9Q5NdkCZ
2Q0BPvtxgGZiWzx4IPCTBKk7I1Sn79uHHlF9kIyBCn2wLVJWAJDZYmnpy5JWfb/C
+SLVafJjQ+G5sFhdRBQnMWrr05q+Nr51uhQ/gHwca3bVRoA1vTFhNo//OC5nLyOk
Pk4FPtYYGyS0Vk5mZuzfmMdqNNiu1GuoB7pEzdc/7IQUUEqWjbxkXiwnqQAqmtbx
fevM6Yb94QtnL2BujqbXjG1o5YKJeqiIsihx1FQShwTYkkisEd+0F4rLJu5oGegw
lQIDAQAB
-----END PUBLIC KEY-----`;

// Pesan yang ingin dikirim
const message = "I want some apples";

// Generate signature dari Alice
const signer = crypto.createSign("sha256");
signer.update(message);
signer.end();
const signature = signer.sign(alicePrivateKeyPem, "hex");

// Enkripsi pesan menggunakan Public Key Bob
const encryptedMessage = crypto.publicEncrypt(
    bobPublicKeyPem,
    Buffer.from(message)
);

console.log("Signature:", signature);
console.log("Message:", encryptedMessage.toString("hex"));