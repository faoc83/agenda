// Dependencies
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var Event = require('../models/Event.js');

// Models
router.post('/user/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username, password: password }, function(err, user) {
        if (err) {
            return res.status(500).send()
        }

        if (!user) {
            return res.status(404).send()
        }

        return res.status(200).send(user._id);
    });
});

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
router.get('/user/events/:id', function(req, res, next) {
    User.findById(req.params.id).populate('events').exec((err, user) => {
        console.log(user);
        if (err) return next(err);
        res.json(user.events);
    })
});

router.get('/event/todayEventByUser/:id/:today', function(req, res, next) {
    Event.find({ userId: req.params.id, startDate: { $regex: req.params.today + '.*' } }, function(err, e) {
        if (err) return next(err);
        res.json(e);
    });
});

router.post('/event/create', function(req, res) {

    User.findOne({ _id: '5b45e33a673c3612a493aa02' }, function(err, u) {


        if (err) {
            console.log(err)
        }
        console.log(JSON.stringify(u))

        var p = new Event();
        p.title = "1212344";
        p.start = "2018-07-11T10:00";
        p.end = "2018-07-11T10:00";
        p.user = u._id;

        Event.create(p, (err, p1) => {
            if (err) {
                console.log("eroo:" + err)
            }
            u.events.push(p1);
            u.save().then(n => {
                res.status(200).json({ 'adUnit': 'User added successfully' });
            })
        })
    });

    /* p.title = req.body.title;
    p.startDate = req.body.startDate;
    p.endDate = req.body.endDate;
    p.sDate = req.body.sDate;
    p.userId = req.body.userId */


    // p.save().then(n => {
    //         res.status(200).json({ 'adUnit': 'AdUnit in added successfully' });
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(400).send("unable to save to database");
    //     });

});
// Return router
module.exports = router;