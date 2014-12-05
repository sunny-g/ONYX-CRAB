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

app.post('/photos/new', function(req, res) {
  req.form.complete(function(err, fields, files) {
    if(err) {
      next(err);
    } else {
      ins = fs.createReadStream(files.photo.path);
      ous = fs.createWriteStream(__dirname + '/client/photos/' + files.photo.filename);

      util.pump(ins, ous, function(err) {
        if(err) {
          next(err);
        } else {
          res.redirect('/');
        }
      });
      //console.log('\nUploaded %s to %s', files.photo.filename, files.photo.path);
      //res.send('Uploaded ' + files.photo.filename + ' to ' + files.photo.path);
    }
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
