 var express = require('express');
 var path = require('path');
 var logger = require('morgan');
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var cors = require('cors');
 var User = require('./server/models/User.js');

 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/cocus', {
     useMongoClient: true
 });


 var cocusUser = new User({
     name: 'CocusCeo',
     username: 'CocusCeo',
     password: 'CocusCeo'
 });
//  cocusUser.save().then((d) => {
//      console.log('deu ok')

//  }).catch((e) => {

//      if (e) console.log(e)
//  })

 var app = express();

 app.use(cors());
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ 'extended': 'true' }));
 app.use(express.static(path.join(__dirname, 'dist')));

 // Routes
 app.use('/api', require('./server/routes/api'));

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
 });


 module.exports = app;