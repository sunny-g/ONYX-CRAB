var express = require('express');
var mongoose = require('mongoose');
// var partials = require('express-partials');
var db = require('../db/dbInit.js');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var url = require('url');
var fs = require('fs');
var path = require('path');

var PORT = 8080;

var app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
// Parse multipart input
app.use(busboy());

app.post('/', function(req, res) {
  console.log('post request', req.url);
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading filename: " + filename);
    fstream = fs.createWriteStream(__dirname + '/../client/photos/' + filename);
    file.pipe(fstream);
    fstream.on('close', function () {
      // res.redirect('back');
      console.log('closing stream');
      // res.end();
    });
  });

});

app.use(express.static(__dirname + '../../client'));
app.use('*', function(req, res){
  // res.redirect('/');
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
