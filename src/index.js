var express = require('express');
var app = express();

const serviceAccount = require('../credential/PasseParaFrente-85f0528d64f1.json');
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://passeparafrente-1552317006614.firebaseio.com"
});
const Firestore = require('@google-cloud/firestore');
async function main() {
    const firestore = admin.firestore();
 
    const document = firestore.doc('/produtos/TxDOdI285Gy7BXJsP5rJ');
    console.log('Document created');
 
    // Enter new data into the document.
    await document.set({
      title: 'Welcome to Firestore',
      body: 'Hello World',
    });
    console.log('Entered new data into the document');
 
    // Update an existing document.
    await document.update({
      body: 'My first Firestore app',
    });
    console.log('Updated an existing document');
 
    // Read the document.
    let doc = await document.get();
    console.log('Read the document');
 
    // Delete the document.
    await document.delete();
    console.log('Deleted the document');
 
};
 
main().catch(console.error);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});