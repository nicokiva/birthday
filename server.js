require('dotenv').load();

var path = require('path');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use('/client', express.static(path.join(__dirname + '/client')));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);