var express = require('express');
var mongoose = require('mongoose');
// var partials = require('express-partials');
var db = require('../db/dbInit.js');
var bodyParser = require('body-parser');
var url = require('url');



var app = express();

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/db/photos', function(req, res){
  // db.insertModel(req.body.job, db.job);

  db.findModels(db.job, function(data) {
    res.json(data);
  });
  // console.log('getjobs');
  // res.end();
});
app.post('/db/photos', function(req, res){
  //save for later
  // console.log(req.body);
  db.insertModel(req.body, db.job);

  res.end();
});

// app.get('/db/tutors', function(req, res){
//   //placeholder
//   db.findModels(db.tutor, function(data) {
//     res.json(data);
//   });

// });
// app.post('/db/tutors', function(req, res){
//   //placeholder
//   db.insertModel(req.body, db.tutor);

//   res.end();
// });
// app.get('/db/matches', function(req, res){
//   var matchData = {};
//   db.findModels(db.job, function(data){
//     matchData.jobs = data;
//     db.findModels(db.tutor, function(data){
//       matchData.tutors = data;
//       matchData.matches = [];
//       matchData.jobs.sort(function(a,b){
//         return b.offer - a.offer;
//       });
//       matchData.tutors.sort(function(a,b){
//         return b.score - a.score;
//       });
//       var limit = Math.min(matchData.jobs.length, matchData.tutors.length);
//       for (var i = 0; i < limit; i++) {
//         matchData.matches.push({job: matchData.jobs[i], tutor: matchData.tutors[i]});
//       }
//       res.json(matchData);
//     });
//   });
// });

// app.get('/reset', function(req, res, next){
//   db.remove({}, db.job);
//   db.remove({}, db.tutor);
//   db.populate();
//   next();
// });

app.use(express.static(__dirname + '../../client'));
app.use('*', function(req, res){
  res.redirect('/');
});
//------------ROUTING------------------------------------------------------------------------


//----------------Methods----------------



// app.get('*', function(req, res) {
//   res.sendFile('index.html');
// });

console.log('Server is listening on 3000');
app.listen(3000);


mongoose.connect('mongodb://localhost/jobColl');

module.exports = app;