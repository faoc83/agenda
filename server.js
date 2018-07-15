 var express = require('express');
 var path = require('path');
 var logger = require('morgan');
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var cors = require('cors');
 var User = require('./server/models/User.js');

 /**
  * moogoose connnection
  */
 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/cocus', {
     useMongoClient: true
 });
 
 /**
  * Create Some default Users and Main Cocus User; 
  */
 var user1 = new User({
    name: 'Cocus User1',
    username: 'User1',
    password: 'User1'
});

var user2 = new User({
    name: 'Cocus User2',
    username: 'User2',
    password: 'User2'
});

var user3 = new User({
    name: 'Cocus User3',
    username: 'User3',
    password: 'User3'
});

User.findOne({username:'User1'}).then((u)=>{
    if(!u){
        user1.save().then((d) => {
           console.log('User1 Created')       
       }).catch((e) => {
           if (e) console.log(e)
       })
    }

})

User.findOne({username:'User2'}).then((u)=>{
    if(!u){
        user2.save().then((d) => {
           console.log('User2 Created')       
       }).catch((e) => {
           if (e) console.log(e)
       })
    }

})

User.findOne({username:'User3'}).then((u)=>{
    if(!u){
        user3.save().then((d) => {
           console.log('User3 Created')       
       }).catch((e) => {
           if (e) console.log(e)
       })
    }

})

var cocusUser = new User({
    name: 'CocusCeo',
    username: 'CocusCeo',
    password: 'CocusCeo'
});


 User.findOne({username:'CocusCeo'}).then((u)=>{
     if(!u){
        cocusUser.save().then((d) => {
            console.log('Default User Created')       
        }).catch((e) => {
            if (e) console.log(e)
        })
     }
 
 })


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