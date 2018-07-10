// Dependencies
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var Events = require('../models/Event.js');
// Models
router.get('/user', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});


/* GET ALL Events */
router.get('/event', function(req, res, next) {
    Events.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* GET ALL User Events */
router.get('/event/eventByUder/:id', function(req, res, next) {
    Events.find({ userId: req.params.id }, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});


// Return router
module.exports = router;