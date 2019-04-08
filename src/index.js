const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const itemRoute = require('./route/items');
const usersRoute = require('./route/users');

async function main() {
    /*const document = firestore.doc('/produtos/TxDOdI285Gy7BXJsP5rJ');
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
    console.log(doc);
 */
    // Delete the document.
    //await document.delete();
    //console.log('Deleted the document');
};

app.use(bodyParser());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/items', itemRoute.list);
app.get('/users', usersRoute.list);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});