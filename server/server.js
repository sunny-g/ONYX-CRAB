var express = require('express');
var mongoose = require('mongoose');
// var partials = require('express-partials');
var db = require('../db/dbInit.js');
var bodyParser = require('body-parser');
var url = require('url');
var fs = require('fs');
var path = require('path');

var PORT = 8080;

var app = express();

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/photos/*', function(req, res){

});

app.post('/api/photos/*', function(req, res) {
  // var data = new Buffer('');
  // req.on('data', function(chunk) {
    // data = Buffer.concat([data, chunk]);
  var data = '';
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end', function() {
    // req.rawBody = data;     
    fs.writeFile(__dirname + 'client/photos' + req.url, data ,function(err){
      if(err) throw err;
      console.log('ok saved')
    });
    res.send('ok');
  });
});


app.use(express.static(__dirname + '../../client'));
app.use('*', function(req, res){
  res.redirect('/');
});
//------------ROUTING------------------------------------------------------------------------

//----------------Methods----------------


// app.get('*', function(req, res) {
//   res.sendFile('index.html');
// });

console.log('Server is listening on', PORT);
app.listen(PORT);

mongoose.connect('mongodb://localhost/jobColl');

module.exports = app;
