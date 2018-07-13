// Dependencies
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var Event = require('../models/Event.js');


// Models
router.post('/user/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            return res.status(500).send()
        }

        if (!user) {
            return res.status(404).send()
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            console.log('Password:', isMatch);
        });

        return res.status(200).send(user);
    });
});

router.get('/user', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/**
 * remove evento e atualiza lista de eventos do utilizador
 */
router.delete('/event/delete/:id', function(req, res) {

    Event.findById(req.params.id, (err, ev) => {
        console.log("encontra evento: " + ev)
        if (err) return res.status(500).send(err);
        ev.remove().then(() => {
            const response = {
                message: "Event successfully deleted",
                id: ev._id
            };


            return res.status(200).send(response);
        }).catch((e) => {
            console.log(e)
            return res.status(500).send("erro");
        })

    });



})

/* GET ALL User Events */
router.get('/user/events/:id', function(req, res, next) {
    User.findById(req.params.id).populate('events').exec((err, user) => {

        if (err) return next(err);
        if (user.events) {
            res.json(user.events);
        } else {
            res.json(null);
        }

    })
});

router.get('/event/todayEventByUser/:id/:today', function(req, res, next) {
    Event.find({ userId: req.params.id, startDate: { $regex: req.params.today + '.*' } }, function(err, e) {
        if (err) return next(err);
        res.json(e);
    });
});



/**
 * cria novo evento
 */
router.post('/event/create', function(req, res) {

    User.findOne({ _id: req.body.userId }, function(err, u) {
        if (err) {
            console.log(err)
        }

        var newEvent = new Event();
        newEvent.title = req.body.title;
        newEvent.start = req.body.start;
        newEvent.end = req.body.end;
        newEvent.user.push(u);

        Event.create(newEvent).then(p1 => {
            u.events.push(p1);
            u.save().then(n => {
                res.status(200).json(newEvent);
            })
        }).catch(e => {
            res.status(400).send('Erro:' + e);
        })
    });
});
// Return router
module.exports = router;