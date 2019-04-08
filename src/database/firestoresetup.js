const serviceAccount = require('../../credential/PasseParaFrente-85f0528d64f1.json');
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://passeparafrente-1552317006614.firebaseio.com"
});
module.exports = admin.firestore();