const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const itemRoute = require('./route/items');
const usersRoute = require('./route/users');

app.use(bodyParser());

app.get('/', function (req, res) {
  res.send('It is working!');
});

app.get('/items', itemRoute.list);
app.get('/users', usersRoute.list);
app.post('/users', usersRoute.save);

app.listen(3000, function () {
  console.log('Passe para Frente APP listening on port 3000!');
});