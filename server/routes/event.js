var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Events = require('../models/Event.js');


/* GET ALL UserS */
router.get('/event', function(req, res, next) {
    Events.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});


module.exports = router;