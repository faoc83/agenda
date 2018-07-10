 var express = require('express');
 var path = require('path');
 var logger = require('morgan');
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var cors = require('cors');


 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/cocus', {
     useMongoClient: true
 });


 var app = express();

 app.use(cors());
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ 'extended': 'true' }));
 app.use(express.static(path.join(__dirname, 'dist')));

 app.use('/user', require('./server/routes/user'));
 app.use('/event', require('./server/routes/event'));
 // Routes
 app.use('/api', require('./server/routes/api'));

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
 });


 // error handler
 /* app.use(function(err, req, res, next) {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page
     res.status(err.status || 500);
     res.render('error');
 }); */

 module.exports = app;