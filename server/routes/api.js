// Dependencies
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var Event = require('../models/Event.js');
// Models
router.get('/user', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});


/* GET ALL Events */
router.get('/event', function(req, res, next) {
    Event.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* GET ALL User Events */
router.get('/event/eventByUder/:id', function(req, res, next) {
    Event.find({ userId: req.params.id }, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.get('/event/todayEventByUder/:id/:today', function(req, res, next) {
    Event.find({ userId: req.params.id,startDate:{$regex: req.params.today + '.*' }}, function(err, e) {
        if (err) return next(err);
        res.json(e);
    });
});

router.post('/event/create', function(req, res, next) {
    var p = new Event();
    p.title = req.body.title;
    p.startDate=req.body.startDate;
    p.endDate=req.body.endDate;
    p.sDate=req.body.sDate;
    p.userId=req.body.userId
    p.save().then(n => {
        res.status(200).json({'adUnit': 'AdUnit in added successfully'});
        })
        .catch(err => {
            console.log(err)
        res.status(400).send("unable to save to database");
        });
  
});
// Return router
module.exports = router;