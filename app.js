const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const http = require('http');
const app = express();
const itemRoute = require('./src/route/items');
const usersRoute = require('./src/route/users');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser());
app.use(helmet());

app.get('/', function (req, res) {
  res.send('It is working!');
});

app.get('/items', itemRoute.list);
app.get('/users', usersRoute.list);
app.post('/users', usersRoute.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Passe para Frente APP listening on port:' + app.get('port'));
});