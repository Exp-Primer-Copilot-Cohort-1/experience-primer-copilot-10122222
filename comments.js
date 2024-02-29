// Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
// Set port
app.set('port', 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up the database
var Datastore = require('nedb');
var db = new Datastore({ filename: 'comments.db', autoload: true });

// Set up the routes
app.get('/comments', function(req, res) {
  db.find({}, function(err, docs) {
    res.json(docs);
  });
});

app.post('/comments', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  db.insert(req.body, function(err, newDoc) {
    res.json(newDoc);
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});